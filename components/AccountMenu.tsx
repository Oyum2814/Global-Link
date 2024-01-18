import {signOut} from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import profileImg from '@/public/images/default-blue.jpeg';
import useCurrentUser from '@/hooks/useCurrentUser';
import logo from '@/public/assets/logo.png';
import Link from 'next/link'
import { useRouter } from 'next/router';
interface AccountMenuProps{
    visible?: boolean,
}
const AccountMenu:React.FC<AccountMenuProps> =({visible})=>{
    const {data:user} = useCurrentUser();
    const router = useRouter();
    if (!visible) return null;
    const handleClick = (e:any) => {
        e.preventDefault()
        router.push('/profile')
      }
    return (
        <div className="border-[0.5px] rounded-md bg-white text-black w-56 absolute top-14 right-0 py-5 m-4 flex-col border-1 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row items-center w-full">
                    <Image width="80" height="80" objectFit="cover"
                    className="h-10 w-10 object-cover rounded-full"
                    src={user?.image? user.image : logo} alt="profileImage"/>
                    <p className="text-black ml-4 text-md cursor-default font-semibold">
                        {user?.username}
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-[0.5px] my-4"/>
                <p onClick={handleClick}
                className="mx-auto text-md font-[600] text-serif cursor-pointer">
                    Profile Settings
                </p>
                <hr className="bg-gray-600 border-0 h-[0.5px] my-4"/>
                <div onClick={()=>signOut()} className="text-center text-white text-sm bg-blue-500 hover:bg-blue-600 w-[90%] px-4 py-2 mx-auto rounded-md font-bold cursor-pointer">
                    Sign Out
                </div>
            </div>
        </div>
    );
};
export default AccountMenu;