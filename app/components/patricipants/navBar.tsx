import { NavLinks } from "../home/navLinks"
import { ListItem } from "../regular_list"

type Links = {href : string , link: string}
const links : Links[] = [
    {href : "/espaceParticipant" , link : "profile"},
    {href : "/espaceParticipant" , link : "espace"},
    {href : "/espaceParticipant" , link : "project"}
]

export const NavBar = () => {
    return (
        <div className="flex gap-5">
            <div className="w-20 h-5 border bg-muted"></div>
            <ListItem 
                items={links}
                resourcename="links"
                component={NavLinks}
                className="flex text-xs"
            />  
        </div>
    )
}