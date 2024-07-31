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
      const [participation , setParticipation] = useState<string>('chercheur')
      
      const router = useRouter()
const mutation = useMutation({
    mutationFn : async (formData : BodyInit) => {
        return await fetch('http://localhost:8000/api/indiv/create' , {
            method : 'POST',
            headers : {
                "Contente-type" : "Application/json",
                "authorization" : `Bearer ${authToken} ` 
            },
            body : formData
        })
        .then((res) => console.log( res.ok , "demande envoyé" && "demande envoyé" , res ))
        .catch((error) => console.log(error))
    }
})

const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
        const formData = new FormData() ;
            formData.append('status' , "attente")
            formData.append('motivation' , motivation)
            formData.append('participation' , participation)
            formData.append('hackathon_id' , hackathon_id)
            mutation.mutate(formData)
            
            // for(let [key , value] of formData.entries()) {
                // console.log(`${key} : ${value}`)}
            }
        const [chercheur , setChercheur] = useState<boolean>(true)
        const [solo , setSolo] = useState<boolean>(false)
        const [equipeDeja , setEquipeDeja] = useState<boolean>(false)
        
        
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
            <CheckboxEl label="#ChercheUneEquipe" checked={chercheur} onClick={() => {
                setChercheur(true);
                setEquipeDeja(false);
                setSolo(false)
                setParticipation('chercheur')
            }} />
            <CheckboxEl label="#J'aiDejaUneEquipe" checked={equipeDeja} onClick={() => {
                setEquipeDeja(true)
                setSolo(false)
                setChercheur(false);
                setParticipation('equipaDeja')
            }} />
            <CheckboxEl label="#JeSuisEnSolo" checked={solo} onClick={() => {
                setSolo(true)
                setChercheur(false);
                setEquipeDeja(false);
                setParticipation('solo')
            }} />
        </div>

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