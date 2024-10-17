"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "../components/Navbar";
import { LuUploadCloud } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UploadImage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ฟังก์ชันเพื่อจัดการไฟล์ที่ถูกอัปโหลด
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, []);

  // ฟังก์ชันเพื่อลบรูปภาพ
  const handleRemoveImage = () => {
    setUploadedImage(null); // เคลียร์ค่ารูปภาพ
  };

  // ใช้ useDropzone สำหรับ drag-and-drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
  });

  return (
    <div className="bg-white flex flex-col">
      <Navbar />
      <div className="sm:flex w-full h-full">
        <div className="flex justify-center items-center w-full flex-col">
          <div className="flex w-full sm:h-full h-80 relative overflow-hidden sm:p-12 p-4">
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
              <div {...getRootProps()} className="flex w-full h-full">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex items-center gap-2 justify-center bg-[#f5b199] w-full rounded-lg border-dashed border-[3px] border-gray-200 cursor-pointer drop-shadow-lg">
                    <LuUploadCloud color="white" size={60} />
                    <p className="text-white">Drop Image here!</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center bg-[#f5b199] w-full hover:border-dashed hover:border-[3px] border-gray-200 border-dashed border-[1px] rounded-lg cursor-pointer drop-shadow-lg">
                    <LuUploadCloud color="white" size={60} />
                    <p className="text-white">Upload Image</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full sm:h-full h-80 relative overflow-hidden sm:p-12 p-4">
            {uploadedImage ? (
              <div className="flex w-full relative drop-shadow-lg">
                <Image
                  src="/Image_predicted.png"
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
                placeholder="Patient ID"
                className="w-full p-2 border border-gray-300 rounded"
              />

              <div className="flex w-full gap-x-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="วันที่"
                  className="w-40 p-2 border border-gray-300 rounded text-sm"
                  isClearable
                  showPopperArrow={false}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />

                <select className="w-full p-2 border border-gray-300 rounded">
                  <option value="">เพศ</option>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                </select>

                <input
                  type="text"
                  placeholder="อายุ"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Treatment Method */}
              <input
                type="text"
                placeholder="วิธีการรักษา"
                className="w-full p-2 border border-gray-300 rounded"
              />

              {/* Disease Selection */}
              <select className="w-full p-2 border border-gray-300 rounded">
                <option value="">โรคที่ต้องการรักษา</option>
                <option value="ไข้หวัด">ไข้หวัด</option>
                <option value="ไข้เลือดออก">ไข้เลือดออก</option>
                <option value="มะเร็ง">มะเร็ง</option>
                <option value="เบาหวาน">เบาหวาน</option>
                <option value="ความดันโลหิตสูง">ความดันโลหิตสูง</option>
                <option value="หัวใจ">โรคหัวใจ</option>
                <option value="ปอดบวม">ปอดบวม</option>
                <option value="หลอดเลือดสมอง">หลอดเลือดสมอง</option>
                <option value="ปวดท้อง">ปวดท้อง</option>
                <option value="กระเพาะอาหารอักเสบ">กระเพาะอาหารอักเสบ</option>
                <option value="ภูมิแพ้">ภูมิแพ้</option>
                <option value="ตับแข็ง">ตับแข็ง</option>
                <option value="ไตวาย">ไตวาย</option>
                <option value="ไขข้ออักเสบ">ไขข้ออักเสบ</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>

              {/* Post-Recovery Status */}
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>หลังจากหาย</option>
              </select>

              {/* Additional Details */}
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                placeholder="รายละเอียดอื่นๆ"
              ></textarea>
            </form>

            <button className="p-2 w-full mt-6 bg-orange-500 text-white rounded text-xl">
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
