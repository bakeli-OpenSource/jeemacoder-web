import { BanknoteIcon, Calendar, DoorClosed, Globe, MapPinIcon, SmilePlus, TagsIcon } from "lucide-react"

export const HackDetailsCard = () => {
    
    return (
        <div className="flex flex-col gap-10 rounded-md my-5">
            <div className="flex items-center gap-3"> 
                <DoorClosed className="stroke-1"/>
                <p> Date limite des inscription : 2024-10-17 </p>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                <DetailsCardItem icon={Globe} text="Presentielle"/>
                <DetailsCardItem icon={MapPinIcon} text="HLM GR Yoff "/>
                <DetailsCardItem icon={ SmilePlus } text="inscription en cours"/>
                <DetailsCardItem icon={BanknoteIcon} text="Prix"/>
            </div>
            <div className="flex flex-col gap-5">
                <DetailsCardItem icon={Calendar} text=" Demarrage: " amount="2024-03-04" />
                <DetailsCardItem icon={Calendar} text=" Fin :" amount="2024-03-04" />
            </div>
            <div>
                <TagsIcon className="stroke-1"/>
                <div className="grid grid-cols-2 gap-2">
                    <span className="bg-light-orange rounded-full px-4 py-1 text-xs text-dark flex-item-center">Developpement-web</span>
                    <span className="bg-light-orange rounded-full px-4 py-1 text-xs text-dark flex-item-center"> Mobile </span>
                    <span className="bg-light-orange rounded-full px-4 py-1 text-xs text-dark flex-item-center"> React / larave </span>
                </div>
            </div>
        </div>
    )
}

const DetailsCardItem = ({icon : Icon , text , amount , className } : {
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
