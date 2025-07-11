import {useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup(){
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password
        })
        alert("you have signed up");
        navigate("/signin");
    }
    
    return <div className="h-screen w-screen bg-gray-200 flex items-center  justify-center">
        <div className="bg-white flex flex-col  rounded-xl border min-w-48 p-8 shadow shadow-slate-400 drop-shadow-xl">
            <h1 className="text-violet-600 font-normal text-center pb-3 text-3xl underline">Sign up</h1>
            <Input ref = {usernameRef} placeholder="Username"/>
            <Input ref = {passwordRef} placeholder="Password"/>
            <div className="flex justify-center pt-6">
             <Button onClick={signup}  loading = {false} fullwidth = {true} varient="primary" text="Sign up" /> 
            </div>
            <div className=" pt-3 flex text-blue-700">
                <span>
                    Already have an account?  
                </span>
                <div className="cursor-pointer" onClick={()=>{navigate("/signin")}}>
                    sign in
                </div>
            </div>
        </div>
    </div>
}