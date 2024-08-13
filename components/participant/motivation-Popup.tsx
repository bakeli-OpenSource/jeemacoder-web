"use client"
import { ChangeEvent, useState } from "react"
import { Button } from "../button"
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";

let authToken: string | null = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
  }

  export const MotivationPopup = ({hackathon_id , onClose} : {hackathon_id : string , onClose : () => void}) => {
      const [motivation , setMotivation] = useState('')
      const [participation , setParticipation] = useState<string>('solo')
      const [solo , setSolo] = useState<boolean>(false)
      const [equipeDeja , setEquipeDeja] = useState<boolean>(false)
      const [equipeName , setEquipeName ] = useState('')

      const router = useRouter()
const mutation = useMutation({
    mutationFn : async (formData : BodyInit) => {
        return await fetch( !equipeDeja ? 'http://localhost:8000/api/indiv/create' : "http://localhost:8000/api/equipe/create" , {
            method : 'POST',
            headers : {
                "Contente-type" : "Application/json",
                "authorization" : `Bearer ${authToken} ` 
            },
            body : formData ,
            
        })
        .then((res) => console.log( res.ok , "demande envoyé" && "demande envoyé" , res ))
        .catch((error) => console.log(error))
    }, onSuccess : () => {
        setMotivation("")
        setEquipeName('')
    }
})
const mutationMenbreEquipe = useMutation({
    mutationFn : async (formData : BodyInit) => {
        return await fetch("http://localhost:8000/api/membre/add" , {
            method : 'POST',
            headers : {
                "Contente-type" : "Application/json",
                "authorization" : `Bearer ${authToken} ` 
            },
            body : formData ,
            
        })
        .then((res) => console.log( res.ok , "demande envoyé" && "demande envoyé" , res ))
        .catch((error) => console.log(error))
    }, onSuccess : () => {
        setMotivation("")
        setEquipeName('')
    }
})

const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData() ;
    const formDataMenbreEquipe = new FormData()

            formData.append('status' , "en attente")
            formData.append('motivation' , motivation)
            formData.append('hackathon_id' , hackathon_id)
            if(equipeDeja){
                formData.append('name' ,  equipeName )
            }
            
            formDataMenbreEquipe.append('type_member' , 'chef')
            formDataMenbreEquipe.append('equipe_id' , "1")

            mutation.mutate( formData )
            mutationMenbreEquipe.mutate(formDataMenbreEquipe)
            
            // for(let [key , value] of formData.entries()) {
                // console.log(`${key} : ${value}`)}
    }
        
        
    return (
        <div className="bg-white shadow-md px-9 py-4 flex flex-col gap-y-3 rounded-md">
        <div className="p-1 rounded-full cursor-pointer float-right w-8" onClick={onClose}> <XIcon /> </div>
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5 transition-all items-center">
        <p className=""> Peut etre une question de la part des organisateurs ? </p>
        <span></span>
        <textarea rows={3} className="outline-none px-3 py-1 border rounded-md w-80 text-xs" 
            placeholder="ajoutez votre motivation et quelque chose " value={motivation} 
            onChange={(e : ChangeEvent<HTMLTextAreaElement>) => { setMotivation(e.target.value) }} 
            />
        <div className="flex gap-3">
           
            <CheckboxEl label="J'ai deja Une équipe" checked={equipeDeja} onClick={() => {
                setEquipeDeja(true)
                setSolo(false)
                setParticipation('equipeDeja')
            }} />
            <CheckboxEl label="Je suis en solo" checked={solo} onClick={() => {
                setSolo(true)
                setEquipeDeja(false);
                setParticipation('solo')
            }} />
        </div>
        {
            equipeDeja && <div className="w-full ">
            <div className="flex flex-col">
                <label className="text-xs">nom de votre équipe</label>
                <input value={equipeName} onChange={(e : ChangeEvent<HTMLInputElement>) => {setEquipeName(e.target.value)}}
                type="text" className="border outline-none text-xs px-2 py-1 rounded-md w-60" />
            </div>
        </div>
        }

            <Button types="button" type="submit" size="small" className="bg-dark text-white ">
                Envoyer
            </Button>    
    </form> 
        </div>
    )
}
const CheckboxEl = ({label , checked , onClick , onChange} : {label : string , checked : boolean , onClick ?: () => void , onChange ?: (e : ChangeEvent<HTMLInputElement>) => void}) => {
    return ( <div className="flex items-center gap-2" onClick={onClick}>
        <input type="checkbox" className="" checked={checked} />
        <label htmlFor="" className="text-xs" > {label} </label>
    </div> )
}