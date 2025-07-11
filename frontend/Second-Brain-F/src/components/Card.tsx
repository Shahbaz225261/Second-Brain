import { BACKEND_URL } from "../config";
import { DeleteIcon } from "../icons/DeleteIcon";
import { PlusIcon } from "../icons/PlusIcons"
import { ShareIcon } from "../icons/ShareIcons"
import axios from "axios";
// import { useContent } from "../hooks/useContent";
interface CardProps{
    refresh:()=>void;
    id:string;
    link:string;
    title:string;
    type:"youtube" | "twitter";
}
 
export function Card({refresh,id,link,type,title} : CardProps){
    function deleteCard(){
        axios.delete(`${BACKEND_URL}/api/v1/content/`,{
            data:{
                contentId:id
            },
            headers:{
                "Authorization":localStorage.getItem("token")
            },
        })
        
        refresh();
    }

    return <div className="bg-white border border-gray-200 rounded-lg shadow-md max-w-72 p-4 min-h-48 min-w-72">
        <div className="flex justify-between items-center">
            <div className="flex space-x-3">
                <div ><PlusIcon/></div>
                <div className="text-md font-semibold">{title}</div>
            </div>
            <div className="flex space-x-3">
                <div>
                    <a href={link} target="_blank">
                        <ShareIcon/>
                    </a>
                </div>
                <div onClick={deleteCard}>
                    <DeleteIcon/>
                </div>
            </div>
        </div>
        <div className="pt-4">
            {type === "youtube" && <iframe className="w-full"  src={link.replace("watch","embed").replace("?v=","/")}
             title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
             encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
             allowFullScreen></iframe>}
             
            {type == "twitter" &&  <blockquote className="twitter-tweet">
                <a href={link.replace("x.com","twitter.com")}></a> 
           </blockquote> }
        </div>
    </div>
}

