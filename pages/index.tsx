import {getSession} from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import PostCreate from "@/components/posts/PostCreate";
import PostFeed from "@/components/posts/PostFeed";

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false,
      }
    }
  }

  return {
    props:{}
  }
}

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Navbar />
      <div className="absolute mt-32 md:ml-16  w-[90%] md:w-[50%] text-black">
        <PostCreate />
        <PostFeed />
      </div>
    </div>
  )
}