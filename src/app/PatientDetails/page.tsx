"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PatientDetails() {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [selectedDiseaseName, setSelectedDiseaseName] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const [patientIdInput, setPatientIdInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const diseaseOptions: { [key: string]: string } = {
    "1": "Superficial basal cell carcinoma (sBCC)",
    "2": "Actinic keratose",
    "3": "Bowen disease",
    "4": "หูด (Cutaneous wart)",
    "5": "รักษาสิวและรอยแผลเป็นจากสิว",
  };

  const handlePatientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientIdInput(e.target.value);
    setSearchError(null); 
  };

  useEffect(() => {
    if (patientIdInput.trim() === "") {
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      handleSearchById(patientIdInput.trim());
    }, 2500); 
    return () => clearTimeout(timer);
  }, [patientIdInput]);

  const handleSearchById = async (patientId: string) => {
    console.log("Searching for Patient ID:", patientId);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/patient/${patientId}`
      );
      if (response.data.patient_entities) {
        setSelectedPatient(response.data.patient_entities);
        setSearchError(null);
      } else {
        setSelectedPatient(null);
        setSearchError("ไม่พบข้อมูลผู้ป่วยที่ค้นหา");
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error fetching patient details", error);
      setSearchError(
        error.response?.data?.message || "ไม่สามารถค้นหาข้อมูลผู้ป่วยได้"
      );
      setSelectedPatient(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDiseaseChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const diseaseId = e.target.value;
    setSelectedDisease(diseaseId);

    if (diseaseId) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/patients/diseases/${diseaseId}`
        );

        if (response.data.patient_entities) {
          const patientsArray = Array.isArray(response.data.patient_entities)
            ? response.data.patient_entities
            : [response.data.patient_entities];
          setPatients(patientsArray);
        } else {
          setPatients([]); 
        }

        setSelectedDiseaseName(diseaseOptions[diseaseId] || "");

        setIsModalOpen(true);
      } catch (error) {
        setPatients([]); 
        setSelectedDiseaseName(diseaseOptions[diseaseId] || "");
        setIsModalOpen(true); 
        console.log(error)
      }
    } else {
      setPatients([]);
      setIsModalOpen(false);
      setSelectedDiseaseName("");
    }

    setSelectedDisease("");
  };

  const handleViewDetails = async (patientId: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/patient/${patientId}`
      );

      if (response.data.patient_entities) {
        setSelectedPatient(response.data.patient_entities);
        setSearchError(null);
      } else {
        setSelectedPatient(null); 
        setSearchError("ไม่พบข้อมูลผู้ป่วยที่ค้นหา");
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.log(error)
      setSearchError(
        error.response?.data?.message || "ไม่สามารถค้นหาข้อมูลผู้ป่วยได้"
      );
      setSelectedPatient(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full overflow-hidden h-full md:h-dvh bg-[url('/bg-flower.png')] bg-right-bottom bg-no-repeat">
        <div className="flex flex-wrap sm:flex w-full h-full">
          <div className="flex items-center mt-10 p-4 sm:mt-0 flex-col w-full md:w-1/2 md:py-12 lg:px-40 px-10 gap-6">
            <div className="flex w-full gap-6">
              <input
                type="text"
                placeholder="Patient ID"
                className="w-full h-auto p-2 border border-gray-300 rounded"
                value={patientIdInput}
                onChange={handlePatientIdChange}
              />
              <select
                className="w-full h-auto p-2 border border-gray-300 rounded"
                value={selectedDisease}
                onChange={handleDiseaseChange}
              >
                <option value="">โรคที่ต้องการติดตาม</option>
                <option value="1">Superficial basal cell carcinoma (sBCC)</option>
                <option value="2">Actinic keratose</option>
                <option value="3">Bowen disease</option>
                <option value="4">หูด (Cutaneous wart)</option>
                <option value="5">รักษาสิวและรอยแผลเป็นจากสิว</option>
              </select>
            </div>

            {/* แสดงข้อความสถานะการค้นหา */}
            {isSearching && (
              <p className="text-blue-500">กำลังค้นหา...</p>
            )}

            {/* แสดงข้อความข้อผิดพลาดในการค้นหา */}
            {searchError && (
              <p className="text-red-500">{searchError}</p>
            )}

            {selectedPatient ? (
              <div className="flex flex-col p-4 gap-6 w-full sm:h-[500px] bg-white border rounded-lg drop-shadow-lg">
                <p className="text-3xl font-extrabold w-full flex justify-center">
                  {selectedPatient.PatientID || selectedPatient.patientId || "ไม่ระบุ"}
                </p>
                <p>
                  วันที่:{" "}
                  {selectedPatient.CreatedAt
                    ? new Date(selectedPatient.CreatedAt).toLocaleDateString()
                    : selectedPatient.createdAt
                    ? new Date(selectedPatient.createdAt).toLocaleDateString()
                    : "ไม่ระบุ"}
                </p>
                <p>เพศ: {selectedPatient.Gender || selectedPatient.gender || "ไม่ระบุ"}</p>
                <p>วิธีการรักษา: {selectedPatient.Treatment || selectedPatient.treatment || "ไม่ระบุ"}</p>
                <p>
                  โรคที่ต้องการรักษา: {selectedPatient.DiseasesMonitored || selectedPatient.diseasesMonitored || "ไม่ระบุ"}
                </p>
                <p>ผลข้างเคียง: {selectedPatient.SideEffects || selectedPatient.sideEffects || "ไม่ระบุ"}</p>
                {/* คุณสามารถเพิ่มข้อมูลเพิ่มเติมได้ที่นี่ */}
              </div>
            ) : (
              // แสดงข้อความว่าไม่พบข้อมูลผู้ป่วย
              searchError && (
                <div className="flex flex-col p-4 gap-6 w-full sm:h-[500px] bg-white border rounded-lg drop-shadow-lg">
                  <p className="text-3xl font-extrabold w-full flex justify-center">
                    ไม่พบข้อมูลผู้ป่วย
                  </p>
                </div>
              )
            )}
          </div>
          {selectedPatient && (
            <div className="flex flex-col gap-10 items-center w-full h-full md:w-1/2 p-2">
              {selectedPatient.ImageSkin && (
                <Image
                  src={selectedPatient.ImageSkin}
                  alt="Image"
                  width={600}
                  height={700}
                  className="bg-[#F26522] bg-opacity-35 p-4 px-10 mt-10 rounded-md"
                />
              )}
              {selectedPatient.SkinPredicted && (
                <Image
                  src={selectedPatient.SkinPredicted}
                  alt="Image Predicted"
                  width={600}
                  height={700}
                  className="bg-white p-4 px-10 drop-shadow-lg shadow-lg rounded-md"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">
            {selectedDiseaseName || "รายชื่อผู้ป่วยตามโรคที่เลือก"}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Patient ID</th>
                  <th className="py-2 px-4 border">เพศ</th>
                  <th className="py-2 px-4 border">อายุ</th>
                  <th className="py-2 px-4 border">วิธีการรักษา</th>
                  <th className="py-2 px-4 border">วันที่สร้าง</th>
                  <th className="py-2 px-4 border">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    patient && ( // ตรวจสอบว่า patient ไม่ใช่ null
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border text-center">
                          {patient.PatientID || patient.patientId || "ไม่ระบุ"}
                        </td>
                        <td className="py-2 px-4 border text-center">
                          {patient.Gender || patient.gender || "ไม่ระบุ"}
                        </td>
                        <td className="py-2 px-4 border text-center">
                          {patient.Age || patient.age || "ไม่ระบุ"}
                        </td>
                        <td className="py-2 px-4 border text-center">
                          {patient.Treatment || patient.treatment || "ไม่ระบุ"}
                        </td>
                        <td className="py-2 px-4 border text-center">
                          {patient.CreatedAt
                            ? new Date(patient.CreatedAt).toLocaleDateString()
                            : patient.createdAt
                            ? new Date(patient.createdAt).toLocaleDateString()
                            : "ไม่ระบุ"}
                        </td>
                        <td className="py-2 px-4 border text-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => {
                              e.stopPropagation(); // หยุดการแพร่กระจายของเหตุการณ์คลิก
                              console.log("Button clicked");
                              handleViewDetails(patient.PatientID || patient.patientId);
                            }}
                          >
                            ดูเพิ่มเติม
                          </button>
                        </td>
                      </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-2 px-4 text-center">
                      ไม่พบผู้ป่วยสำหรับโรคที่เลือก
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </>
  );
}
