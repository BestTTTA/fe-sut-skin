import Image from "next/image";
import Navbar from "../components/Navbar";

export default function PatientDetails() {
  return (
    <div className="w-full relative overflow-hidden h-dvh">
      <Navbar />
      <div className="flex justify-start gap-4 mt-10 w-full ml-40">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="ค้นหาโดย ID"
            style={{ height: "39px", width: "196px", marginRight: "10px" }}
            className="border border-gray-300 rounded px-2"
          />
        </div>

        <select
          className="bg-gray-200 rounded shadow"
          style={{ width: "200px", height: "39px" }}
        >
          <option value="" disabled selected>
            ค้นหาโดยโรคที่ติดตาม
          </option>
          <option value="disease1">โรคที่ 1</option>
          <option value="disease2">โรคที่ 2</option>
          <option value="disease3">โรคที่ 3</option>
          <option value="disease4">โรคที่ 4</option>
        </select>
      </div>

      <div className="flex gap-10 mt-10 w-full justify-start ml-auto pr-10">
        <div
          className="bg-white p-5 rounded-lg ml-40 shadow-lg"
          style={{ width: "650px", height: "619px" }}
        >
          <h2 className="text-center text-2xl font-bold mb-6">ข้อมูล</h2>

          <div className="flex flex-col gap-4 text-lg leading-7">
            <p>วันที่: 16 ตุลาคม 2567</p>
            <p>เพศ: ชาย</p>
            <p>อายุ: 28</p>
            <p>วิธีการรักษา: MAL-PDT</p>
            <p>วิธีการรักษา: -</p>
            <p>โรคที่ต้องการรักษา: Bowens disease</p>
            <p>ผลข้างเคียง: ไม่มี</p>
          </div>
        </div>

        <div className="flex flex-col items-end w-full">
          <div
            className="p-3 bg-[#f9d6cc] rounded-lg mb-10"
            style={{
              width: "658px",
              height: "352px",
              border: "2px dashed #f9a99c",
              marginTop: "-90px",
              transform: "translateX(-60px)",
            }}
          >
            <div className="flex justify-center items-center h-full w-full">
              <Image
                src="/image 1 (1).png"
                alt="OCT Scan Top"
                width={549}
                height={306}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Second Image Section with a different background */}
          <div
            className="relative p-3 bg-white rounded-lg shadow-lg"
            style={{
              width: "658px",
              height: "366px",
              transform: "translateX(-60px)",
              zIndex: 2,
            }}
          >
            <div className="flex justify-center items-center h-full w-full">
              <Image
                src="/image 2 (1).png"
                alt="OCT Scan Bottom"
                width={546}
                height={303}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Background Design Element Positioned */}
          <div
            className="absolute bottom-0 right-0"
            style={{ width: "900px", height: "740px", zIndex: 1 }}
          >
            <Image
              src="/g1.png"
              alt="Graphic Design"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
