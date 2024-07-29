"use client"
import { ChangeEvent, useState } from "react"
import { Button } from "../button"
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

let authToken: string | null = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
  }

    
export const MotivationPopup = ({hackathon_id} : {hackathon_id : string}) => {
    const [motivation , setMotivation] = useState('')
        
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
        }).then(() => router.back())
        .then((res) => console.log( "demande envoyé", res ))
        .then(res => router.push(`/listhackathons/details/${hackathon_id}`))
        .catch((error) => console.log(error))
    }
    })

    const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData() ;
            formData.append('status' , "en attente")
            formData.append('motivation' , motivation)
            formData.append('hackathon_id' , hackathon_id)
            mutation.mutate(formData)

            // for(let [key , value] of formData.entries()) {
            // console.log(`${key} : ${value}`)}
        }

    return (<form onSubmit={handleSubmit} className="max-w-2xl rounded-md px-9 py-7 flex flex-col gap-5 bg-white transition-all shadow-md items-center">
        <p className=""> Peut etre une question de la part des organisateurs ? </p>
        
        <textarea rows={3} className="outline-none px-3 py-1 border rounded-md w-80 text-xs" 
            placeholder="ajoutez votre motivation et quelque chose " value={motivation} 
            onChange={(e : ChangeEvent<HTMLTextAreaElement>) => { setMotivation(e.target.value) }} />    
            <Button types="button" type="submit" size="small" className="bg-dark text-white ">
                Envoyer
            </Button>    
    </form> )
}