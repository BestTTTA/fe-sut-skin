"use client";

import React from "react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "../components/Navbar";
import { LuUploadCloud } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";

export default function UploadImage() {
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const [gender, setGender] = useState("");
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const [hasSideEffects, setHasSideEffects] = useState<string>("");
  const handleSideEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasSideEffects(e.target.value);
  };

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };
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
                placeholder="Patient ID"
                className="w-full p-2 border border-gray-300 rounded"
              />

              <div className="flex w-full gap-4 flex-wrap">
                <input
                  type="number"
                  placeholder="อายุ"
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
                placeholder="วิธีการรักษา"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="ตัวยาในการรักษา"
                className="w-full p-2 border border-gray-300 rounded"
              />

              <select className="w-full p-2 border border-gray-300 rounded">
                <option value="">โรคที่ต้องการติดตาม</option>
                <option value="1">
                  Superficial basal cell carcinoma (sBCC)
                </option>
                <option value="2">Actinic keratose</option>
                <option value="3">Bowen disease</option>
                <option value="4">หูด(Cutaneous wart)</option>
                <option value="5">รักษาสิวและรอยแผลเป็นจากสิว</option>
              </select>

              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={hasSideEffects}
                onChange={handleSideEffectChange}
              >
                <option value="no">ไม่มี</option>
                <option value="yes">มี</option>
              </select>

              {hasSideEffects === "yes" && (
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mt-4"
                  rows={3}
                  placeholder="รายละเอียดเพิ่มเติม"
                ></textarea>
              )}
            </form>

            <button className="p-2 w-full mt-6 bg-orange-500 text-white rounded text-xl hover:bg-orange-300">
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
