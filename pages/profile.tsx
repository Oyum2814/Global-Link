import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import { NextPageContext } from "next";
import {getSession} from "next-auth/react";

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
  
const profile = () => {
    return ( 
        <div className="">
            <Navbar />
            <Profile />
        </div>
     );
}
 
export default profile;