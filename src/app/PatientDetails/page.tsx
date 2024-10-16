import Image from 'next/image';

export default function PatientDetails() {
  return (
    <div className="w-full relative overflow-hidden" style={{ minHeight: '1000px' }}> 
      {/* Background Image */}
      <Image
        src="/v1.png"
        alt="SUT University Header"
        width={1512}
        height={84}
        className="w-full h-auto"
      />

      {/* Logo Positioned Over Background (Left) */}
      <div className="absolute top-2 left-4">
        <Image
          src="/v2.png"
          alt="SUT Logo"
          width={315}
          height={70}
          className="object-contain"
        />
      </div>

      {/* Admin Image Positioned Over Background (Right) */}
      <div className="absolute top-5 right-4 flex items-center">
        <p
          className="text-white text-lg mr-2"
          style={{ width: '96px', height: '39px', fontSize: '28px', lineHeight: '39px' }}
        >
          Admin
        </p>
        <Image
          src="/v3.png"
          alt="Admin Image"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
      </div>

      {/* Search Section */}
      <div className="flex justify-start gap-4 mt-10 w-full ml-40">
        <button
          className="bg-gray-200 rounded shadow"
          style={{ width: '196px', height: '39px' }}
        >
          ค้นหาโดย ID
        </button>
        <button
          className="bg-gray-200 rounded shadow"
          style={{ width: '200px', height: '39px' }}
        >
          ค้นหาโดยโรคที่ติดตาม
        </button>
      </div>

      {/* Main Content Section */}
      <div className="flex gap-10 mt-10 w-full justify-start ml-auto pr-10">
        {/* Form Section */}
        <div className="bg-white p-5 rounded-lg ml-40 shadow-lg" style={{ width: '650px', height: '619px' }}>
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
          {/* First Image Section with a background */}
          <div className="p-3 bg-[#f9d6cc] rounded-lg mb-10" style={{ width: '658px', height: '352px', border: '2px dashed #f9a99c', marginTop: '-90px', transform: 'translateX(-60px)' }}>
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
          <div className="relative p-3 bg-white rounded-lg shadow-lg" style={{ width: '658px', height: '366px', transform: 'translateX(-60px)', zIndex: 2 }}>
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
          <div className="absolute bottom-0 right-0" style={{ width: '900px', height: '740px', zIndex: 1 }}>
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
