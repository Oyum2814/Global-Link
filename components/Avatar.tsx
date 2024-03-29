import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";
import logo from '@/public/assets/logo.png'
import { getFileById } from "@/pages/appwrite";
interface AvatarProps{
    userId:string;
    isLarge?:boolean;
    hasBorder?:boolean;
}

const Avatar:React.FC<AvatarProps> = ({userId, isLarge, hasBorder})=>{
    const {data:fetchedUser} = useUser(userId);
    const router = useRouter();
    const onClick = useCallback((event:any)=>{
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    },[router,userId]);
    return(
        <div className=
        {`
            ${hasBorder?'border-4 border-black':''}
            ${isLarge?'h-32':'h-12'}
            ${isLarge?'w-32':'w-12'}
            rounded-full hover:opacity-90 transition cursor-pointer relative flex-shrink-0
        `}>
            <Image
            fill
            style={{
                objectFit:'cover',
                borderRadius:'100%'
            }}
            sizes={"25"}
            alt="Avatar"
            onClick={onClick}
            src={fetchedUser?.image? getFileById(fetchedUser?.image) : logo}
            />
        </div>
    );
}
export default Avatar;