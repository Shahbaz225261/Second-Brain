import { Twitter } from "../icons/Twitter"
import { SidebarItems } from "./SidebarItems"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { LogoIcon } from "../icons/LogoIcon"
export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 border-2  top-0">
        <div className="pt-4">
            <h1 className="flex items-center gap-2 pl-2 pb-7 pt-2 font-bold text-2xl">
                <div className="text-purple-600">
                    <LogoIcon/>
                </div>
                Second Brain 
            </h1>

            <div className="w-60 pl-4">
                <SidebarItems text="Tweets" icon={<Twitter/>} />
                <SidebarItems text="videos" icon={<YoutubeIcon/>}/>
            </div>
        </div>
    </div>
}