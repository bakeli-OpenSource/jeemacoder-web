import { BanknoteIcon, Calendar, DoorClosed, Globe, MapPinIcon, SmilePlus, TagsIcon } from "lucide-react"


export const DetailsCardItem = ({icon : Icon , text , amount , className } : {
    icon : React.ElementType , text ?: string , amount ?: string | number, className ?: string
}) => {
    return (
    <div className={`flex gap-4 ${className}`} >
        {Icon ? <Icon className="stroke-1  " />  : null}
        <span>{text} </span>
        <span> {amount} </span>
    </div>
     )
}
