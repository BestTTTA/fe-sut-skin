import { FC } from "react";
import Image from "next/image";

const Navbar: FC = () => {
  return (
    <nav className="flex justify-between w-full p-4 bg-gradient-to-r from-[#6D6E70] to-[#F26522]">
        <Image src="/SUTlogo.png" alt="Sut logo" height={150} width={150}/>
        <div className="flex items-center gap-4">
            <p className="text-white text-xl">Admin</p>
            <div className="flex justify-center items-center rounded-full bg-orange-600">
                <Image src="/profile_mock.png" alt="Profile" width={40} height={40}/>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
