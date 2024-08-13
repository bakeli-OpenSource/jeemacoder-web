import Image from "next/image"
import { ImgCollpsed } from "./img-collabsed"
import { BanknoteIcon, Calendar, SmilePlus, TagsIcon } from "lucide-react"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import {ErrorBoundary} from 'react-error-boundary'
import hackathonlogoLoader from "@/app/utils/hackathonlogoLoader"
import { Mutation, useQuery } from "@tanstack/react-query"
import { getTags } from "@/app/utils/api/data"
import { ListItem } from "../regular_list"



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
        status , prix , theme , id} = hackathons

    const {data , isLoading , isError} = useQuery({
        queryFn : async () => await getTags(id),
        queryKey : ["tags" , id]
    })
    console.log(data)
        
    const router = useRouter()
    return (
        <div className={clsx("flex max-w-3xl cursor-pointer rounded-lg border overflow-auto" , {
            " border-light-green" : theme == "vert" , 
            "border-dark" : theme == "neutre",
            "border-orange " : theme == "orange"
        })}>
        <div onClick={() => router.push(`listhackathons/details/${id}?name=${name}`)}
            className={clsx(" p-7 flex flex-col gap-7 " )}>
            <div className="flex gap-10 ">
                <div className="flex flex-col gap-5">
                <Image src={`${logo_url}`} loader={hackathonlogoLoader}
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
                        {isLoading ? <div>Loading</div> : 
                        <ListItem 
                            items={data || []}
                            resourcename="tag"
                            component={TagElement}
                            className=""
                        />
                        }
                    </div>
            </div>
                </div>
            </div>
            <div  className="flex">
            </div>
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


export const TagElement = ({tags} : {tags : {theme : string , name : string}} ) => {
    const {name , theme} = tags
    return (
        <span className={clsx(" rounded-full px-4 py-1 text-xs text-dark flex-item-center bg-muted" , {
            // "bg-light-orange" : theme == "orange",
            // "bg-light-green" : theme == "vert" ,
            // "bg-muted" : theme === "neutre"
        })}>{name}</span>
    )
}