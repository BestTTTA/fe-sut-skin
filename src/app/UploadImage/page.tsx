"use client";

import React from "react";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "../components/Navbar";
import { LuUploadCloud } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";
import { NewPatientRequest } from "../type/type";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function UploadImage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [patientID, setPatientID] = useState<string>("");
  const handlePatientIDChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPatientID(event.target.value);
  };

  const [age, setAge] = useState<number>(0);
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(event.target.value, 10);
    setAge(newAge);
  };

  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const [gender, setGender] = useState<string>("");
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const [treatment, setTreatment] = useState<string>("");
  const handleTreatmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTreatment(e.target.value);
  };

  const [medicines_treatment, setMedicinesTreatment] = useState<string>("");
  const handleMedicinesTreatment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicinesTreatment(e.target.value);
  };

  const [haveSideEffect, setHaveSideEffect] = useState<string>("");
  const handleHaveSideEffect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHaveSideEffect(e.target.value);
  };

  const [sideEffects, setSideEffects] = useState<string>("");
  const handleSideEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSideEffects(e.target.value);
  };

  const [selectedDisease, setSelectedDisease] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: "",
  });
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const id = parseInt(selectedOption.value, 10);
    const name = selectedOption.text;
    setSelectedDisease({ id, name });
  };

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const uploadImageToServer = async () => {
    if (!imageFile) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result.file_url) {
        setImageUrl(result.file_url);
      }
    } catch (error: any) {
      alert("Failed to upload image.");
      console.log(error)
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
    setImageFile(file);
  }, []);

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
  });

  const patientData: NewPatientRequest = {
    patient_id: patientID,
    gender: gender,
    age: age,
    treatment: treatment,
    medicines_treatment: medicines_treatment,
    diseases_monitored: selectedDisease.name,
    diseases_id: selectedDisease.id,
    side_effects: sideEffects === "มี" ? haveSideEffect : sideEffects,
    image_skin: imageUrl,
    skin_predicted: "http://119.59.99.192:9000/sut-skin-image/predicted.png",
    date: selectedDate,
  };

  const [success, setSuccess] = useState<boolean>(false);
  const createPatient = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });
      if (response.ok) {
        setSuccess(true);
      }
      if (!response.ok) {
        throw new Error(`Failed to create patient: ${response.statusText}`);
      }
      // return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; 

    if (success) {
        timer = setTimeout(() => {
            setSuccess(false);
        }, 2000);
    }
    return () => {
        if (timer) clearTimeout(timer);
    };
}, [success]);

  useEffect(() => {
    if (imageUrl) {
      createPatient();
    }
  }, [imageUrl]);

  return (
    <div className="bg-white flex flex-col">
      <Navbar />
      {success ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          บันทึกข้อมูลสำเร็จ
        </Alert>
      ) : null}
      <div className="sm:flex w-full h-full">
        <div className="flex justify-center items-center w-full flex-col">
          <div className="flex w-full sm:h-full h-80 overflow-hidden sm:p-8 p-4">
            {uploadedImage ? (
              <div className="flex relative">
                <Image
                  src={uploadedImage}
                  alt="Uploaded Image"
                  className="w-full rounded-lg"
                  width={400}
                  height={400}
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 text-white p-1 bg-gray-300 bg-opacity-50 rounded-full hover:scale-105"
                >
                  <MdClose
                    color="white"
                    size={20}
                    className="hover:scale-105"
                  />
                </button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className="flex w-full h-full cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex items-center justify-center bg-[#f5b199] w-full rounded-lg border-dashed border-[3px] border-gray-200 drop-shadow-lg">
                    <LuUploadCloud color="white" size={60} />
                    <p className="text-white">Drop Image here!</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-[#f5b199] w-full rounded-lg border-dashed border-[1px] border-gray-200 drop-shadow-lg">
                    <LuUploadCloud color="white" size={60} />
                    <p className="text-white">Upload Image</p>
                  </div>
                )}
                {uploadedImage && (
                  <div className="flex flex-col items-center mt-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        borderRadius: "8px",
                      }}
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded shadow"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full sm:h-full h-80 overflow-hidden sm:p-8 p-4">
            {uploadedImage ? (
              <div className="flex w-full relative drop-shadow-lg">
                <Image
                  src="/predicted.png"
                  alt="Uploaded Image"
                  className="w-full rounded-lg"
                  width={400}
                  height={400}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg drop-shadow-lg">
                <CiNoWaitingSign color="gray" size={80} />
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full h-full justify-center items-center mt-20 sm:mt-0">
          <div className="flex w-full flex-col items-center p-4 sm:p-14">
            <form className="flex flex-col w-full gap-y-4 bg-white p-8 shadow-lg rounded-lg border-opacity-35 border-2 border-gray-400">
              <input
                type="text"
                value={patientID}
                onChange={handlePatientIDChange}
                placeholder="Patient ID"
                className="w-full p-2 border border-gray-300 rounded"
              />

              <div className="flex w-full gap-4 flex-wrap">
                <input
                  type="number"
                  value={age}
                  placeholder="อายุ"
                  onChange={handleAgeChange}
                  className="w-40 flex-auto p-2 border border-gray-300 rounded"
                />

                <select
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  className="block w-40 flex-auto  p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    -- Select Gender --
                  </option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                </select>

                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="block flex-auto w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <input
                type="text"
                value={treatment}
                onChange={handleTreatmentChange}
                placeholder="วิธีการรักษา"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={medicines_treatment}
                onChange={handleMedicinesTreatment}
                placeholder="ตัวยาในการรักษา"
                className="w-full p-2 border border-gray-300 rounded"
              />

              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedDisease.id}
                onChange={handleSelectChange}
              >
                <option value="">โรคที่ต้องการติดตาม</option>
                <option value="1">
                  Superficial basal cell carcinoma (sBCC)
                </option>
                <option value="2">Actinic keratose</option>
                <option value="3">Bowen disease</option>
                <option value="4">หูด (Cutaneous wart)</option>
                <option value="5">รักษาสิวและรอยแผลเป็นจากสิว</option>
              </select>

              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={sideEffects}
                onChange={handleSideEffectChange}
              >
                <option value="">พบผลข้างเคียง</option>
                <option value="ไม่มี">ไม่มี</option>
                <option value="มี">มี</option>
              </select>

              {sideEffects === "มี" && (
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mt-4"
                  rows={3}
                  placeholder="รายละเอียดเพิ่มเติม"
                  value={haveSideEffect}
                  onChange={handleHaveSideEffect}
                ></textarea>
              )}
            </form>

            <button
              className="p-2 w-full mt-6 bg-orange-500 text-white rounded text-xl hover:bg-orange-300"
              onClick={uploadImageToServer}
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
