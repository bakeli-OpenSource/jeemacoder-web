import Image from "next/image"
import { Button } from "../button"
import { ImgCollpsed } from "./img-collabsed"
import { useRef, useState } from "react"
import { Modal } from "../modal"
import Link from "next/link"
import { DetailsButton } from "./detailsButton"

    export const HackathonCard = ({hackathons , onClick , } : {hackathons : {
    logo_url : string , 
    date_debut : string,
    name : string ,
    structure_organisateur : string ,
    description : string ,
    status : "passe" | "encour" | "arriving" ,
    participants : number ,
    id : string 
    prix : string
}, 
    onClick : () => void
}) => {
    

    const {logo_url , date_debut , name , structure_organisateur , description , 
            status , participants , id  , prix} = hackathons
            
    return (
        <div onClick={onClick}
            className="max-w-4xl border border-dark rounded-md p-7 flex flex-col gap-7 cursor-pointer ">
            <div className="flex gap-10">
                <div>
                <Image src={`/${logo_url}`}
                    width={130} 
                    height={100} 
                    alt="hack logo" 
                    className="border rounded-  md"/>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm italic">{date_debut} </p>
                    <h1 className="text-2xl">{name} </h1>
                    <h2 className="text-md font-light ">organisateur : {structure_organisateur} </h2>
                </div>
                <div className=" flex flex-col gap-2">
                    <p className="font-semibold">Prix : {prix} </p> 
                    <div className="font-semibold">Staut : {status} </div>
                    <div className="w-52 flex flex-col">
                        <span className="border px-3 py-1 rounded-md bg-gray-foreground text-xs w-auto">web-developpement</span>
                        <span className="border px-3 py-1 rounded-md bg-gray-foreground text-xs w-auto">React</span>
                        <span className="border px-3 py-1 rounded-md bg-gray-foreground text-xs w-auto">Laravel</span>
                    </div>
                </div>
            </div>
            <div  className="flex justify-between">
                <div className="flex gap-4">
                    <Button types="button" size="small" className="" href=""> Participer </Button>
                </div>
                <div className="flex items-center gap-4">
                    <div> <ImgCollpsed /> </div>
                    <div className="font-semibold text-sm">+{participants}participants</div>
                </div>
            </div>
        </div>
    )
}