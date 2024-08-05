import { BellIcon } from "@radix-ui/react-icons"
import { Avatar } from "../avatar"
import { useContext } from "react"
import { UserContext } from "@/app/utils/context"
import { User } from "@/app/utils/definitions"


const profil = {
    firstname : "jeemacoder team",
    email : "kaly100diallo@gmail.com"
}

export const Profil = () => {
    const user: User | null = useContext(UserContext)
    // const user = useUserContext()
    console.log(user?.firstname);
    
    return <div className="h-40 bg-white p-3 justify-between flex flex-col rounded-md">
    <div className="flex justify-between">
        <span className="text-xs">notificatios</span> 
        <BellIcon /> 
    </div>
        <div>
            <Avatar profil={user || { firstname: '', email: '' }} variante="small" className="gap-1"/> 
        </div>
    </div>
}
