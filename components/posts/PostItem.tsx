import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../Avatar";
import { MdDelete } from "react-icons/md";
import { useCallback, useState } from "react";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import { TiTick } from "react-icons/ti";
import toast from "react-hot-toast";
interface PostItemProps{
    data:Record<string,any>;
    userId?:string;
    showExactTime?:boolean;
}

const PostItem:React.FC<PostItemProps> = ({data,userId,showExactTime}) =>  {

    const {data:currentUser,mutate} = useCurrentUser();
    const {mutate:mutatePosts} = usePosts();
    const [isEditing, setIsEditing] = useState(false);
    const [newBody, setNewBody] = useState(data?.body);
    
    const toggleEdit = useCallback(()=>{
        setIsEditing((prevIsEditing) => !prevIsEditing);
      },[]);

    const deletePost= useCallback(async()=>{
        const postId=data?.id;
        try{
            await axios.delete('/api/posts',{data:{ postId }});
            mutatePosts();
        }
        catch(error){
            console.error('Error deleting post:', error);
        }
    },[data.id,mutatePosts]);

    const updatePost = useCallback(async()=>{
        const postId=data?.id;
        try{
            await axios.patch('/api/posts/updatePost',{
                postId,
                body:newBody
            });
            setNewBody(newBody);
            mutatePosts();
            toast.success("Updated Successfully")
            toggleEdit();
        }
        catch(error){
            console.log(error);
        }
    },[data?.id,mutatePosts,newBody]);
  
    return ( 
        <div className="bg-white my-4 p-4  rounded-lg">
            <div className="flex justify-around items-center w-full">
                <div className="flex items-center mr-auto w-auto">
                    <Avatar userId={data?.user?.id}/>
                    <h2 className="ml-3 font-sans font-[700]">{data?.user?.username}</h2>
                </div>
                {(data?.user?.id==currentUser?.id) && 
                (<div className="flex ">
                    <div 
                    onClick={toggleEdit}
                    className="bg-blue-600 rounded-md text-white px-2 py-1 cursor-pointer">
                        Edit
                    </div>
                    <div 
                    onClick = {deletePost} 
                    className="text-red-600 cursor-pointer">
                        <MdDelete size={30}/>
                    </div>
                </div>
                )}
            </div>
            {isEditing?
            (
                <div className="w-full flex flex-col">
                    <textarea
                    value={newBody}
                    onChange={(e) => {
                        setNewBody(e.target.value);
                    }}
                    className="p-2 w-full focus:outline-none focus:border-0 focus:border-b-[2px] border-black">
                        {newBody}
                    </textarea>
                    <div
                    onClick={updatePost}
                    className="ml-auto bg-green-700 text-white px-4 py-2 rounded-lg text-sm mt-2">
                        Update
                    </div>
                </div>
            ):
            <div
                className="p-2 w-full">
                    {data?.body}
            </div>
            }
           
        </div>
     );
}
 
export default PostItem;