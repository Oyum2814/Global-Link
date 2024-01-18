import usePosts from "@/hooks/usePosts";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const PostCreate = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [body,setBody] = useState('');
    const {mutate:mutatePosts} = usePosts();
    const onSubmit = useCallback(async () =>{
        try{
            setIsLoading(true);

            const url = '/api/posts';

            await axios.post(url,{body});
            toast.success('Tweet Created!');
            setBody('');
            mutatePosts();
        }
        catch(error){
            toast.error('Something went Wrong')
        }
        finally{
            setIsLoading(false);
        }
    },[body,mutatePosts]);
    return ( 
        <div className="bg-white w-full p-2 flex flex-col my-2 rounded-xl">
            <textarea
            value={body}
            onChange={(e)=>setBody(e.target.value)}
             className="text-[20px] placeholder-neutral-400 text-black
             disabled:opacity-80 peer resize-one mt-3 w-full bg-transparent ring-0 outline-none p-2 my-2"
             placeholder={"Whats on your mind?"}> 
            </textarea>
            <button
            onClick={onSubmit}
            className="text-white bg-blue-600 px-6 py-2 ml-auto rounded-xl">
                Post
            </button>
        </div>
     );
}
 
export default PostCreate;