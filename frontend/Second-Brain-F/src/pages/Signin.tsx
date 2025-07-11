import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface resType{
    username:string;
    password:string;
    token:string;
}

export function Signin(){
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

 async function signin() {
  try {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    const response = await axios.post<resType>(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password
    });
    
    // Success block
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard")

  } catch (error: any) {
    const msg = error?.response?.data?.msg;
    if (msg === "password incorrect") {
      alert("❌ Password is incorrect");
    } else if (msg === "user do not exist") {
      alert("❌ User does not exist");
    } else if (msg === "error in inputs") {
      alert("❌ Invalid inputs");
    } else {
      alert("❌ Something went wrong");
    }
    console.error(error);
  }
}

    return <div className="w-screen h-screen bg-gray-200 flex justify-center items-center ">

        <div className="bg-white rounded-xl min-w-48 p-6 pt-6 shadow shadow-slate-400 drop-shadow-xl">
            <h1 className="text-violet-600 font-normal text-center pb-3 text-3xl underline">Sign In</h1>
            <Input ref={usernameRef} placeholder="Username"  />
            <Input ref={passwordRef} placeholder="Password"  />
            <div className="pt-6">
                <Button onClick={signin} fullwidth={true}  loading={false}  text="Sign in" varient="primary" />
            </div>
        </div>
    </div>
}