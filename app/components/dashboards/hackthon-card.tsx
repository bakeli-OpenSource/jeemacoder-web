import Image from "next/image"
import { Button } from "../button"
import { ImgCollpsed } from "./img-collabsed"
import { useRef, useState } from "react"
import { Modal } from "../modal"
import Link from "next/link"
import { DetailsButton } from "./detailsButton"
import { BanknoteIcon, Calendar, SmilePlus, TagsIcon } from "lucide-react"
import clsx from "clsx"
import { useRouter } from "next/navigation"

    export const HackathonCard = ({hackathons , onClick , } : {hackathons : {
    logo_url : string , 
    date_debut : string,
    name : string ,
    structure_organisateur : string ,
    description : string ,
    status : "ouvert" | "terminé" | "arriving" ,
    participants : number ,
    id : string 
    prix : string ,
    theme : string
}, 
    onClick : () => void
}) => {
    

    const {logo_url , date_debut , name , structure_organisateur , 
            status , participants , prix , theme , id} = hackathons

    const router = useRouter()
    return (
        <div onClick={() => router.push(`listhackathons/details/${id}`)}
            className={clsx(" max-w-3xl rounded-md p-7 flex flex-col gap-7 cursor-pointer border-2" , {
                " border-light-green" : theme == "vert" , 
                "border-dark" : theme == "neutre",
                "border-orange " : theme == "orange"
            })}>
            <div className="flex gap-10 ">
                <div className="flex flex-col gap-5">
                <Image src={`/hotelPic.jpg`}
                    width={130} 
                    height={100} 
                    alt="hack logo" 
                    className="border rounded-md"/>
                <div className="gap-4">
                    <div> <ImgCollpsed /> </div>
                    <div className="font-semibold text-sm">+{100}participants</div>
                </div>
                </div>
                <div className="flex flex-col gap-2">
                    <DetailsCardItem icon={Calendar} text={date_debut} />
                    <h1 className={clsx('text-2xl' , {
                        "text-dark-green-hover" : theme == "vert",
                        "text-orange" : theme == "orange",
                        "text-dark" : theme == "neutre",

                    })}>{name} </h1>
                    
                    <h2 className={clsx("text-md font-light" , {
                        "text-dark-green-hover" : theme == "vert",
                        "text-orange" : theme == "orange",
                    })} > {structure_organisateur} </h2>
                </div>
                <div className=" flex flex-col gap-4">
                    <DetailsCardItem icon={BanknoteIcon} text="Prix" amount={prix} theme={theme}/>
                    <DetailsCardItem icon={ SmilePlus } text={status} />
                    <div>
                        <TagsIcon className="stroke-1"/>
                        <div className="grid grid-cols-2 gap-2">
                        <TagElement text="Web devellopement" theme={theme} />
                        <TagElement text=" creativity " theme={theme} />
                        <TagElement text="React / laravel" theme={theme} />
                    </div>
            </div>
                </div>
            </div>
            <div  className="flex">
            </div>
        </div>
    )
}

const DetailsCardItem = ({icon : Icon , text , amount , className , theme } : {
    icon : React.ElementType , text ?: string , amount ?: string | number, className ?: string , theme ?: string
}) => {
    return (
    <div className={`flex gap-4 ${className}`} >
        {Icon ? <Icon className="stroke-1 " />  : null}
        <span>{text} </span>
        <span className={clsx('font-semibold')}> {amount} </span>
    </div>
     )
}


export const TagElement = ({text , theme} : {text : string ,  theme : string}) => {
    return (
        <span className={clsx(" rounded-full px-4 py-1 text-xs text-dark flex-item-center" , {
            "bg-light-orange" : theme == "orange",
            "bg-light-green" : theme == "vert" ,
            "bg-muted" : theme === "neutre"
        })}>{text}</span>
    )
}