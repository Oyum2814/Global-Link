import {useState, useCallback} from "react";
import Input from "../components/Input";
import axios from 'axios';
import {signIn} from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';
import logo from '@/public/assets/logo.png'
import Image from 'next/image'
const Auth = ()=>{

    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant)=>currentVariant==='login'?'register':'login');
    },[]);

    const login = useCallback(async()=>{
        try{
            const res = await signIn('credentials',{email, password, callbackUrl:'/'});
            if (res?.error) { console.log("Error  - ",res.error); }
        } catch(error){
            console.log(error);
        }
    },[email, password]);

    const register = useCallback(async ()=>{
        try{
            const res= await axios.post('/api/register',{email, username, password});
            login();
        } catch(error) {
            console.log("Error Appeared :: "+error);
        }
    },[email, username, password,login]);

    

    return(
        // <div className="relative h-full w-full bg-white">
        //     <div className="w-full h-full ">
        //         <nav className="px-8 py-3">
        //             {/* <img src="/images/logo.png" alt="Logo" className="h-12"/> */}
        //         </nav>
        //        <div className="flex justify-center px-4 text-black">
        //             <div className="px-16 p-16 self-center rounded-[20px] lg:w-2/5 lg:max-w-md w-full md:mr-[80px] mt-[100px] ">
        //                 <h2 className=" text-4xl mb-8 font-semibold">
        //                     {variant==='login'?'Sign In':'Register'}
        //                 </h2>
        //                 <div className="flex flex-col gap-4">
        //                     {variant==='register'&&(
        //                         <Input 
        //                         label="Username"
        //                         onChange={(e:any)=>setName(e.target.value)}
        //                         id="name"
        //                         value={name}
        //                     />
        //                     )}
                            
        //                     <Input 
        //                         label="Email"
        //                         onChange={(e:any)=>setEmail(e.target.value)}
        //                         id="email"
        //                         type="email"
        //                         value={email}
        //                     />
        //                     <Input 
        //                         label="Password"
        //                         onChange={(e:any)=>setPassword(e.target.value)}
        //                         id="password"
        //                         type="password"
        //                         value={password}
        //                     />
        //                 </div>
        //                 <button onClick={variant==='login'?login:register} className="bg-blue-600 py-3 text-white font-medium rounded-md w-full mt-10
        //                 hover:bg-blue-800 transition-">
        //                     {variant==='login'?'Login':'Sign Up'}
        //                 </button>
        //                 <div className="flex flex-col items-center gap-4 mt-8 justify-center">
        //                     <div onClick={(e)=>{
        //                         e.preventDefault();
        //                         signIn('google',{callbackUrl:'/'});
        //                         }} className="md:px-12 xs:bg-blue-400 border-2 border-black w-auto h-10 flex items-center px-3 py-6 justify-center cursor-pointer hover:opacity-80 transition">
        //                         <FcGoogle size={30}/>
        //                         <div className="ml-3 font-bold">Continue with Google</div>
        //                     </div>
        //                     <div onClick={()=>signIn('github',{callbackUrl:'/'})} className="md:px-12 border-2 border-black w-auto h-10 px-3  py-6 flex items-center justify-center cursor-pointer hover:opacity-80 transition">
        //                         <FaGithub size={30}/>
        //                         <div className="ml-3 font-bold">Continue with Github</div>
        //                     </div>
        //                 </div>
        //                 <p className="text-neutral-500 mt-12 text-center">
        //                     {variant==='login'?'New to TuneHub?':'Already have an account?'}
        //                     <span onClick={toggleVariant} className="text-black ml-1 hover:underline cursor-pointer">
        //                         {variant==='login'?'Create Account':'Login'}
        //                     </span>
        //                 </p>
        //             </div>
        //        </div>
        //     </div>
        // </div>
        <div className="hero bg-no-repeat bg-cover bg-center bg-fixed h-screen w-screen flex flex-col justify-center items-center text-white">
            <Image src={logo} alt="logo" height="80" width="50" className="h-24 w-auto"/>
            <h1 className="jockey-one-regular text-4xl font-400">Global Link</h1>
            <div className="w-[70vw] md:w-[30vw] flex flex-col justify-center items-center">
                {variant==='register'&&(
                    <Input 
                    label="Username"
                    onChange={(e:any)=>setUserName(e.target.value)}
                    id="Username"
                    value={username}/>
                )}    
                <Input 
                    label="Email"
                    onChange={(e:any)=>setEmail(e.target.value)}
                    id="email"
                    type="email"
                    value={email}
                />
                <Input 
                    label="Password"
                    onChange={(e:any)=>setPassword(e.target.value)}
                    id="password"
                    type="password"
                    value={password}
                />
                <button onClick={variant==='login'?login:register} className="bg-blue-600 py-3 text-white font-medium rounded-md w-[100%] mt-5
                        hover:bg-blue-800 transition">
                            {variant==='login'?'Login':'Sign Up'}
                </button>
                <p className="mt-12 text-center">
                            {variant==='login'?'New to Global Link?':'Already have an account?'}
                            <span onClick={toggleVariant} className="underline ml-1 hover:text-blue-600 cursor-pointer">
                                {variant==='login'?'Create Account':'Login'}
                            </span>
                </p>
                <div className="flex flex-col items-center gap-4 mt-8 justify-center">
                            <div onClick={(e)=>{
                                e.preventDefault();
                                signIn('google',{callbackUrl:'/'});
                                }} className="md:px-12 xs:bg-blue-400 border-2 border-black w-auto h-10 flex items-center px-3 py-6 justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                                <div className="ml-3 font-bold">Continue with Google</div>
                            </div>
                            <div onClick={()=>signIn('github',{callbackUrl:'/'})} className="md:px-12 border-2 border-black w-auto h-10 px-3  py-6 flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30}/>
                                <div className="ml-3 font-bold">Continue with Github</div>
                            </div>
                        </div>
            </div>
            
        </div>
    );
}

export default Auth;