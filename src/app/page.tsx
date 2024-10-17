import Image from "next/image";
import Sutimage from "./Image/ImageSUT.jpg";
import SutLogo from "./Image/SUTlogo.png";

export default function Login() {
  return (
    <main className="flex">
      <div className="w-1/2 h-screen flex flex-col justify-center">
        <Image
          src={Sutimage}
          className="w-full h-full object-left object-cover"
          alt="SUT_Image"
          quality={100}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Image
          src={SutLogo}
          className="w-1/2 h-auto mb-4" 
          alt="SUT_Logo"
        />
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-8 w-1/2 mt-4">
          <h1 className="text-5xl text-center mb-16">เข้าสู่ระบบ</h1>
          <form className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-white border border-gray-300 rounded px-4 py-2 w-full shadow-md"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-white border border-gray-300 rounded px-4 py-2 w-full shadow-md"
            />
            <div className="flex items-center justify-between w-full mb-8">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="w-5 h-5 text-orange-600 border-gray-300 focus:ring-orange-500 checked:bg-orange-600 checked:border-transparent"
                />
                <label htmlFor="checkbox" className="text-gray-700">
                  จดจำการเข้าสู่ระบบของฉัน
                </label>
              </div>
              <a href="#" className="text-black underline hover:text-blue-500">
                ลืมรหัสผ่าน?
              </a>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-gray-500 text-white font-bold py-2 px-16 rounded-lg shadow-lg transition duration-300 ease-in-out hover:from-orange-600 hover:to-gray-600"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
