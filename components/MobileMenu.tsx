import React from 'react';
import Link from 'next/link'
import { IoClose } from "react-icons/io5";
interface MobileMenuProps{
    visible?: boolean;
    toggle?:()=>void;
}

const MobileMenu:React.FC<MobileMenuProps>=({visible,toggle})=>{
    return (
        <div 
        className={`bg-black w-56 h-screen absolute 
        ${visible?'-translate-x-[100%]':'translate-x-0'}
        transition duration-500
        top-0 left-0 py-5 flex-col justify-center border-2 border-gray-800 flex`}>
            <div className="flex flex-col gap-4 jockey-one-regular z-300" onClick={toggle}>
                <span className="text-white absolute top-5 right-5 ">
                    <IoClose size={25} />
                </span>
                <Link href='/' className="px-3 text-center text-white hover:underline">
                    Home
                </Link>
                <Link href='/myList' className="px-3 text-center text-white hover:underline">
                    About Us
                </Link>

            </div>
        </div>
    )
};

export default MobileMenu;