import Image from "next/image"
import { Button } from "../button"
import { ImgCollpsed } from "./img-collabsed"
import { useRef, useState } from "react"
import { Modal } from "../modal"
import Link from "next/link"
import { DetailsButton } from "./detailsButton"
import { BanknoteIcon, Calendar, SmilePlus, TagsIcon } from "lucide-react"
import clsx from "clsx"

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
    

    const {logo_url , date_debut , name , structure_organisateur , description , 
            status , participants , prix , theme} = hackathons
    
    return (
        <div onClick={onClick}
            className={clsx(" max-w-4xl rounded-md p-7 flex flex-col gap-7 cursor-pointer" , {
                " border border-[#F47E11]" : theme == "vert" , 
                "border border-dark" : theme == "neutre",
                "" : theme == "orange"
            })}>
            <div className="flex gap-10">
                <div>
                <Image src={`/${logo_url}`}
                    width={130} 
                    height={100} 
                    alt="hack logo" 
                    className="border rounded-md"/>
                </div>
                <div className="flex flex-col gap-2">
                    <DetailsCardItem icon={Calendar} text={date_debut} />
                    <h1 className="text-2xl">{name} </h1>
                    <h2 className="text-md font-light ">organisateur : {structure_organisateur} </h2>
                </div>
                <div className=" flex flex-col gap-2">
                    <DetailsCardItem icon={BanknoteIcon} text="Prix" amount={prix} />
                    <DetailsCardItem icon={ SmilePlus } text="inscription en cours"/>
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
            <div  className="flex justify-between">
                <div className="flex gap-4">
                    <Button types="button" size="small" className="" href=""> Participer </Button>
                </div>
                <div className="flex items-center gap-4">
                    <div> <ImgCollpsed /> </div>
                    <div className="font-semibold text-sm">+{100}participants</div>
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
        <span className="font-semibold"> {amount} </span>
    </div>
     )
}


export const TagElement = ({text , theme} : {text : string ,  theme : string}) => {
    return (
        <span className={clsx(" rounded-full px-4 py-1 text-xs text-dark flex-item-center" , {
            "bg-light-orange" : theme == "vert",
            "bg-light-green" : theme == "neutre"
        })}>{text}</span>
    )
}