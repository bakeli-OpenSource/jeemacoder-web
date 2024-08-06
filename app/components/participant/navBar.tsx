import { Bell } from "lucide-react"
import { NavLinks } from "../home/navLinks"
import { ListItem } from "../regular_list"

type Links = {href : string , link: string}
const links : Links[] = [
    {href : "/espaceParticipant" , link : "acceuil"},
    {href : "/espaceParticipant" , link : "espace"},
    {href : "/espaceParticipant" , link : "project"}
]

const sideBarLink : Links[] = [
    {href : "/espaceParticipant" , link : "details"},
    {href : "/espaceParticipant" , link : "tableaux"},
    {href : "/espaceParticipant" , link : "resources"},
    {href : "/espaceParticipant" , link : "chat"},
]

export const NavBar = () => {
    return (
        <div className="flex gap-5 w-full justify-between ">

            <div className="flex items-center">
                <div className="w-20 h-5 border bg-muted"></div>
                <ListItem 
                items={links}
                resourcename="links"
                component={NavLinks}
                className="flex text-xs"
                /> 
            </div> 

            <div className="flex gap-3 items-center">
                <input type="text" placeholder="rechercher..." 
                    className="w-40 outline-none border rounded-sm px-3 text-xs py-1" />
                <Bell className="stroke-1 size-4" />
                <div className="size-8 border rounded-full"></div>
            </div>

        </div>
    )
}

export const SideBar = () => {
    return (
        <div className="flex gap-5">
            <ListItem 
                items={sideBarLink}
                resourcename="links"
                component={NavLinks}
                className="flex flex-col text-sm font-mono"
            />  
        </div>
    )
}