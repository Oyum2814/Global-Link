import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps{
    userId?:string;
}
const PostFeed:React.FC<PostFeedProps> = ({userId}) =>{
    const {data:posts=[]} = usePosts(userId);
    return ( 
        <div className="md:h-[70vh] overflow-y-auto scrollbar-thin  scrollbar-thumb-white pb-16">
            {posts.map((post:any)=>(
                <PostItem 
                userId={userId}
                key={post.id}
                data={post}/>
            ))}
        </div>
     );
}
 
export default PostFeed;