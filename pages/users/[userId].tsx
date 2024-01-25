import PostFeed from "@/components/posts/PostFeed";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import Image from 'next/image';
import logo from '@/public/assets/logo.png';
import { getFileById } from "@/pages/appwrite";
import Navbar from "@/components/Navbar";
const UserView = ()=>{
    const router = useRouter();
    const { userId } = router.query;
    const {data: fetchedUser,isLoading} = useUser(userId as string);
    if(isLoading || !fetchedUser){
        return (
        <div className="flex justify-center items-center h-full">
            Loading...
        </div>);
    }
    return (
        <>
            <Navbar />
            <div className="h-screen w-screen px-6 py-32">
                
                <div className="bg-black p-4 text-white h-auto flex flex-col items-center rounded-md">
                    <Image src={fetchedUser.image?getFileById(fetchedUser?.image) : logo} alt="" width={40} height={40} 
                        className="rounded-full h-32 w-32 object-cover"/>
                    <h2 className="mt-4 jockey-one-regular text-2xl">{fetchedUser?.username}</h2>
                    <h4 className="text-neutral-500 font-mono">{fetchedUser?.name}</h4>
                    <p>{fetchedUser?.bio}</p>
                </div>
                
            </div>
        </>
    );
}

export default UserView;