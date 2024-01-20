import Image from 'next/image';
import logo from '@/public/assets/logo.png';
import {BsChevronDown,BsSearch,BsBell} from 'react-icons/bs';
import {useState,useCallback,useEffect} from 'react';
import profileImg from '@/public/images/default-blue.jpeg'
import AccountMenu from './AccountMenu';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import useCurrentUser from '@/hooks/useCurrentUser';
import { IoClose } from "react-icons/io5";
import { IoGlobeOutline } from "react-icons/io5";
import Link from 'next/link'
import { getFileById } from '@/pages/appwrite';
const TOP_OFFSET=66;

const Navbar = ()=>{
    const [showMobileMenu,setShowMobileMenu] =useState(true);
    const [showAccountMenu,setShowAccountMenu] =useState(false);
    const {data:user} = useCurrentUser();
    const [showBackground,setShowBackground]=useState(false);

    useEffect(()=>{
        const handleScroll=()=>{
            if(window.scrollY>= TOP_OFFSET)
            {
                setShowBackground(true);
            }
            else
            {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll',handleScroll);

        return ()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[]);
    
    const toggleMobileMenu = useCallback(()=>{
        setShowMobileMenu((current)=>!current);
    },[]);
    const toggleAccountMenu = useCallback(()=>{
        setShowAccountMenu((current)=>!current);
    },[]);

    

    return (
        <nav className="w-full fixed z-40">
                <div className={`px-4 md:px-16 py-6 flex items-center transition 
                duration-500 ${showBackground?'bg-black bg-opacity-95':''}`}>
                <Link href="/" className="font-bold text-white jockey-one-regular hidden md:block">Global Link</Link>
                <div className="flex-row ml-12 gap-7 hidden lg:flex text-white">

                </div>
                <div 
                className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer">
                    <p className="text-white text-sm select-none"
                    onClick={toggleMobileMenu}
                    tabIndex={0} onBlur={toggleMobileMenu}>
                        <IoGlobeOutline size={28}/>
                    </p>
                    <MobileMenu visible={showMobileMenu} toggle={toggleMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center"
                 tabIndex={0} onBlur={toggleAccountMenu} >
                    {/* <div className=" hover:scale-125 cursor-pointer transition">
                        <BsSearch />
                    </div> */}
                    {/* <div className="text-black hover:scale-125 cursor-pointer transition">
                        <BsBell />
                    </div> */}
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative"
                    >
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image width="80" height="80"
                    className="h-10 w-10 object-cover rounded-full border-white border-[1px]"
                    src={user?.image? getFileById(user?.image) :logo} alt="profileImage"/>
                        </div>
                        <BsChevronDown
                      
                         className={`text-white transition hover:scale-125 ${showAccountMenu?'rotate-180':'rotate-0'}`}/>
                    </div>
                    <AccountMenu visible={showAccountMenu}/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;