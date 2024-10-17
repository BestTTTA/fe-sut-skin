"use client"; // เพิ่มบรรทัดนี้ที่ด้านบนของไฟล์

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadImage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
    accept: { 'image/jpeg': [], 'image/png': [] },
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start items-center relative">
      {/* คอนเทนเนอร์รูปภาพด้านบน */}
      <div className="relative w-full bg-gray-100 p-0 flex justify-center items-center z-10">
        <Image
          src="/Rectangle2.png"
          alt="SUT University Header"
          width={1512}
          height={84}
          className="w-full h-auto"
        />
        <div className="absolute top-2 left-4">
          <Image
            src="/SUT1.png"
            alt="SUT Logo"
            width={315}
            height={70}
            className="object-contain"
          />
        </div>

        <div className="absolute top-5 right-4 flex items-center">
          <p
            className="text-white text-lg mr-2"
            style={{
              width: "96px",
              height: "39px",
              fontSize: "28px",
              lineHeight: "39px",
            }}
          >
            Admin
          </p>
          <Image
            src="/image2.png"
            alt="Admin Image"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      {/* คอนเทนเนอร์สำหรับรูปภาพและฟอร์ม */}
      <div className="flex justify-center items-start mt-7 w-full relative z-10">
        {/* ส่วนเนื้อหาภาพ */}
        <div className="w-1/3 flex flex-col">
          <div className="bg-[#f5b199] p-8 rounded-lg shadow-md ml-7">
            {uploadedImage ? (
              <div className="relative">
                <Image
                  src={uploadedImage}
                  alt="Uploaded Image"
                  width={640}
                  height={250}
                  className="rounded-lg"
                />
                {/* ปุ่มลบรูปภาพ */}
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red text-white px-3 py-1 rounded-full"
                >
                  ✖
                </button>
              </div>
            ) : (
              <Image
                src="/Upload Field1.png"
                alt="Default Upload Field Image"
                width={640}
                height={250}
                className="rounded-lg"
              />
            )}
          </div>

          {/* พื้นที่สำหรับลากและวางไฟล์ */}
          <div
            {...getRootProps()}
            className="rounded-lg shadow-md ml-7 mt-6 p-4 border-2 border-dashed border-gray-400 flex justify-center items-center"
            style={{ width: 640, height: 250 }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag &apos;n&apos; drop a file here, or click to select a file</p>
            )}
          </div>
        </div>

        {/* ฟอร์มด้านขวา */}
        <div className="w-1/2 flex flex-col items-center">
          <form className="bg-white p-10 shadow-lg rounded-lg w-2/4 border border-gray-400">
            <input
              type="text"
              placeholder="Patient ID"
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <select className="block w-full p-2 mb-4 border border-gray-300 rounded">
              <option value="">วันที่</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <select className="block w-full p-2 mb-4 border border-gray-300 rounded">
              <option value="">เดือน</option>
              <option value="1">มกราคม</option>
              <option value="2">กุมภาพันธ์</option>
              <option value="3">มีนาคม</option>
              <option value="4">เมษายน</option>
              <option value="5">พฤษภาคม</option>
              <option value="6">มิถุนายน</option>
              <option value="7">กรกฎาคม</option>
              <option value="8">สิงหาคม</option>
              <option value="9">กันยายน</option>
              <option value="10">ตุลาคม</option>
              <option value="11">พฤศจิกายน</option>
              <option value="12">ธันวาคม</option>
            </select>
            <select className="block w-full p-2 mb-4 border border-gray-300 rounded">
              <option value="">เพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
            <input
              type="text"
              placeholder="อายุ"
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="วิธีการรักษา"
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <select className="block w-full p-2 mb-4 border border-gray-300 rounded">
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
            <select className="block w-full p-2 mb-4 border border-gray-300 rounded">
              <option>หลังจากหาย</option>
            </select>
            <textarea
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
              rows={3}
              placeholder="รายละเอียดอื่นๆ"
            ></textarea>
          </form>
          {/* ปุ่มตกลงอยู่ด้านนอกฟอร์ม */}
          <button className="w-2/4 p-3 mt-6 bg-orange-500 text-white rounded">
            ตกลง
          </button>
        </div>
      </div>

      {/* รูปพื้นหลังด้านขวาล่าง */}
      <div className="absolute bottom-1 right-0 z-0">
        <Image
          src="/git1.png"
          alt="Background Image"
          width={1100}
          height={300}
          className="object-cover opacity-80"
        />
      </div>
    </div>
  );
}
