import type { ReactElement } from "react"

interface ButtonTypes{
    varient: "primary" | "secondary",
    text:string,
    StartIcon?: ReactElement,
    onClick?: () => void;
    fullwidth?:boolean;
    loading?:boolean;
}

const VarientTypes = {
    "primary": "bg-blue-600 text-white",
    "secondary": "bg-purple-200 text-black ",
}
const defaultStyles = "px-4 py-2 rounded-md  font-light flex hover:bg-blue-500"

export function Button(props: ButtonTypes){
    return <button onClick={props.onClick} className=  { VarientTypes[props.varient] + " " + defaultStyles + `${props.fullwidth? " w-full flex justify-center items-center" : ""} 
    ${props.loading? "opacity-45 ": ""}` }>
        <div className=" flex gap-2 items-center justify-center">
            {props.StartIcon}
            {props.text}
        </div>
    </button>
    
}