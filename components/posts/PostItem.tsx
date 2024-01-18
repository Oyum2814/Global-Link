import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../Avatar";
import { MdDelete } from "react-icons/md";
import { useCallback } from "react";
import axios from "axios";
import usePosts from "@/hooks/usePosts";

interface PostItemProps{
    data:Record<string,any>;
    userId?:string;
    showExactTime?:boolean;
}

const PostItem:React.FC<PostItemProps> = ({data,userId,showExactTime}) =>  {

    const {data:currentUser,mutate} = useCurrentUser();
    const {mutate:mutatePosts} = usePosts();


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
    return ( 
        <div className="bg-white my-4 p-4  rounded-lg">
            <div className="flex justify-around items-center w-full">
                <div className="flex items-center mr-auto w-auto">
                    <Avatar userId={data?.user?.id}/>
                    <h2 className="ml-3 font-sans font-[700]">{data?.user?.username}</h2>
                </div>
                {(data?.user?.id==currentUser?.id) && 
                <div 
                onClick = {deletePost} 
                className="text-red-600 cursor-pointer">
                    <MdDelete size={30}/>
                </div>
                }
            </div>
            <article className="p-2">
                {data?.body}
            </article>
        </div>
     );
}
 
export default PostItem;