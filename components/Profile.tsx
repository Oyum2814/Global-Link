import { useCallback, useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import axios from "axios";
import {Storage ,ID} from 'appwrite';
import { account, client } from "@/pages/appwrite";

const Profile = () => {
    const {data:currentUser} = useCurrentUser();
    const {mutate:mutateFetchedUser} = useUser(currentUser?.id);
    const [image, setImage] = useState<File|null>(null);
    const [name, setName] = useState('');
    const [username,setUsername] = useState('');
    const [bio,setBio] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        // setImage(currentUser?.image);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    },[
        currentUser?.name,
        // currentUser?.image,
        currentUser?.username,
        currentUser?.bio
    ]);

    const onSubmit = useCallback(async ()=>{
        try{
            setIsLoading(true);
            console.log(image?.name);
            let imageLink="";
            if(image)
            {
                const storage = new Storage(client);
                const promise = storage.createFile(
                '65aa97745edf2ade19da',
                ID.unique(),
                image,
                );

                const response = await promise;
                console.log(response); // Success
                imageLink = response.$id;
            }
            console.log("Image link : "+imageLink);
            await axios.patch('/api/edit',{
                name,
                username,
                bio,
                imageLink,
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
            flex flex-col justify-evenly items-center
              w-[80%] h-auto md:h-[60%] mt-24">
                <div className=" w-full flex flex-col justify-evenly md:flex-row p-4">
                    <div className="w-[80%] mx-auto md:mx-0 md:w-[30%] h-auto cursor-pointer bg-black
                    flex flex-col justify-center items-center">
                        <ImageUpload
                        disabled={isLoading}
                        onChange={(image)=>setImage(image)} 
                        label="Upload Profile Image"
                        user={currentUser}
                        />
                    </div>
                    <div className="md:w-[30%] my-4 flex flex-col justify-center items-center gap-y-8">
                        <div className="w-full">
                            <label className="text-white font-[700] text-lg ">Name</label>
                            <input 
                            placeholder="Name"
                            onChange={(e)=>{setName(e.target.value)}} 
                            value={name}
                            disabled={isLoading}
                            className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-white font-[700] text-lg ">Username</label>
                            <input
                            placeholder="Username"
                            onChange={(e)=>{setUsername(e.target.value)}} 
                            value={username}
                            disabled={isLoading}
                            className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-white font-[700]  text-lg ">Bio</label>
                            <input
                            placeholder="Bio"
                            onChange={(e)=>{setBio(e.target.value)}} 
                            value={bio}
                            disabled={isLoading}
                            className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>
                <button
                onClick={onSubmit}
                className="text-black bg-white rounded-lg w-[75%] md:w-[30%] py-2 text-center font-[600]">
                    Save
                </button>
            </div>
        </div>
     );
}
 
export default Profile;