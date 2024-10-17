import Image from "next/image";

export default function UploadImage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-start items-center relative">
      {/* คอนเทนเนอร์รูปภาพด้านบน */}
      <div className="relative w-full bg-gray-100 p-0 flex justify-center items-center z-10">
        {/* รูป Rectangle1.png ด้านล่าง */}
        <Image
          src="/Rectangle1.png"
          alt="SUT University Header"
          width={1512}
          height={84}
          className="w-full h-auto"
        />
        {/* โลโก้ Positioned Over Background (Left) */}
        <div className="absolute top-2 left-4">
          <Image
            src="/SUT1.png"
            alt="SUT Logo"
            width={315}
            height={70}
            className="object-contain"
          />
        </div>

        {/* รูป Admin Positioned Over Background (Right) */}
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
          {/* เพิ่มสีพื้นหลังเป็นสีส้มอ่อน */}
          <div className="bg-[#f5b199] p-8 rounded-lg shadow-md ml-7">
            <Image
              src="/Upload Field1.png"
              alt="Description of image"
              width={640}
              height={250}
              className="rounded-lg "
            />
          </div>
          <Image
            src="/Rectangle2.png"
            alt="Description of image"
            width={640}
            height={250}
            className="rounded-lg shadow-md ml-7 mt-6"
          />
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
              <option>วันที่</option>
            </select>
            <select className="block w-full p-2 mb-4 border border-gray-300 rounded">
              <option>เพศ</option>
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
              <option>โรงที่ต้องการรักษา</option>
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