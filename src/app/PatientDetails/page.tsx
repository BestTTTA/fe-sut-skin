import Image from "next/image";
import Navbar from "../components/Navbar";

export default function PatientDetails() {
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
              />
              <select className="w-full h-auto p-2 border border-gray-300 rounded">
                <option value="">Select</option>
              </select>
            </div>
            <div className="flex flex-col p-4 gap-6 w-full sm:h-[500px] bg-white border rounded-lg drop-shadow-lg">
              <p className="text-3xl font-extrabold w-full flex justify-center">
                Patient ID
              </p>
              <p>วันที่: 18/10/2024</p>
              <p>เพศ: ชาย</p>
              <p>วิธีการรักษา: MAL-PDT</p>
              <p>โรคที่ต้องการรักษา: Bowen’s disease</p>
              <p>ผลข้างเคียง: ไม่มี </p>
            </div>
          </div>
          <div className="flex flex-col gap-10 items-center w-full h-full md:w-1/2 p-2">
          <Image src="/skin_image.png" alt="Image" width={600} height={700} className="bg-[#F26522] bg-opacity-35 p-4 px-10 mt-10 rounded-md"></Image>
          <Image src="/predicted.png" alt="Image Predicted" width={600} height={700} className="bg-white p-4 px-10 drop-shadow-lg shadow-lg rounded-md"></Image>
          </div>
        </div>
      </div>
    </>
  );
}
