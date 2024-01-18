import { useCallback, useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
    const {data:currentUser} = useCurrentUser();
    const {mutate:mutateFetchedUser} = useUser(currentUser?.id);
    const [image, setimage] = useState('');
    const [name, setName] = useState('');
    const [username,setUsername] = useState('');
    const [bio,setBio] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
        setimage(currentUser?.image);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    },[
        currentUser?.name,
        currentUser?.image,
        currentUser?.coverImage,
        currentUser?.username,
        currentUser?.bio
    ]);

    const onSubmit = useCallback(async ()=>{
        try{
            setIsLoading(true);
            await axios.patch('/api/edit',{
                name,
                username,
                bio,
                image,
            });
            mutateFetchedUser();
            toast.success('Saved');
        }
        catch(error)
        {
            toast.error('Something Went Wrong');
        }
        finally
        {
            setIsLoading(false);
        }
    },[bio,name,username,image,mutateFetchedUser,toast]);

    return ( 
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="bg-black border-neutral-400 border-[1px] rounded-md  
            w-[80%] h-auto md:h-auto md:w-auto mt-24
            flex flex-col  md:flex-row p-4">
                <div className="w-[80%] mx-auto md:w-[40%] h-auto cursor-pointer bg-black
                flex flex-col justify-center items-center">
                    <ImageUpload
                    value={image}
                    disabled={isLoading}
                    onChange={(image)=>setimage(image)} 
                    label="Upload Profile Image"
                    />
                </div>
                <div className="my-4 flex flex-col justify-center items-center gap-y-8">
                    <input 
                    placeholder="Name"
                    onChange={(e)=>{setName(e.target.value)}} 
                    value={name}
                    disabled={isLoading}
                    className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <input
                    placeholder="Username"
                    onChange={(e)=>{setUsername(e.target.value)}} 
                    value={username}
                    disabled={isLoading}
                    className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                     <input
                    placeholder="Bio"
                    onChange={(e)=>{setBio(e.target.value)}} 
                    value={bio}
                    disabled={isLoading}
                    className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <button
                    onClick={onSubmit}
                    className="text-black bg-white rounded-lg w-[75%] py-2 text-center font-[600]">
                        Save
                    </button>
                </div>
                
            </div>
        </div>
     );
}
 
export default Profile;