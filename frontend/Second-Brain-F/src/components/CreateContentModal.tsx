import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios"; 

enum ContentType{
    twitter="twitter",
    youtube="youtube"
}

export function CreateContentModal({ open, onClose }:any) {
    const linkRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const [type,setType] = useState("");

    function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            type,
            title
        },{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }

  return (
    <div>
      {open && (
        <div className="flex items-center justify-center w-screen h-screen bg-slate-500/60 fixed top-0 left-0" onClick={onClose}>
          <div className="bg-white opacity-100 p-6 rounded-lg w-80 shadow-lg "onClick={(e)=>e.stopPropagation()}>
            <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer ">
                    <CrossIcon /> 
                </div>
            </div>
            <div>
              <Input ref={titleRef} placeholder="Title" />
              <Input ref={linkRef} placeholder="Link" />
            </div>
            <div className="flex justify-evenly items-center pt-4 pr-10 p-2 gap-4">
             <h1 className="font-semibold">Type: </h1> 
             
                <Button onClick={()=>{setType(ContentType.twitter)}} varient={type === ContentType.twitter? "primary":"secondary"} text={ContentType.twitter} />
                <Button onClick={()=>{setType(ContentType.youtube)}} varient={type === ContentType.youtube? "primary":"secondary"} text={ContentType.youtube} />
             
            </div>
            <div className="flex justify-center mt-4">
              <Button fullwidth={true} onClick={addContent} varient="primary" text="Submit" />

            </div>
          </div>
        </div>
      )}
    </div>
  );
}



