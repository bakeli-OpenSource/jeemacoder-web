"use client"
import { ChangeEvent, useState } from "react";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

let authToken: string | null = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
  }

export const Tags = ({hackathonId} : {hackathonId : string} ) => {

const [value , setValue ] = useState({
    tagName : "" , hackathonId
})
    
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        setValue({...value , [input.id] : input.value})
        }
    const mutation = useMutation({
        mutationFn: async(formData : BodyInit) => {
            return await fetch('http://localhost:8000//tag/add' , {
            method : 'POST',
            headers : {
                "Contente-type" : "Application/json",
                "authorization" : `Bearer ${authToken}`
            }, 
            body : formData
            }).then((res) => console.log(res , 'les tags crée'))
            .catch((error) => console.log(error , "")
            )
        }
    })
    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        const formData = new FormData()
            formData.append('name' , value.tagName)
            formData.append('hackathonId' , hackathonId)
            mutation.mutate(formData)

    //for(let [key , value] of formData.entries()) {
    //console.log(`${key} : ${value}`);}
    }
    return (
        <div className="max-w-xl">

            <form onSubmit={onSubmit}>
                <label htmlFor="tagName" className="text-sm my-1">Aider les personne a comprendre votre hackathon</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Ajoutez un tags"
                        value={value.tagName}
                        className="w-44 outline-none border placeholder:text-xs text-xs px-4 rounded-md py-1"
                        id="tagName"
                        onChange={handleChange}
                    />
                    <button type="submit" className="w-20 flex items-center justify-center px-4 gap-4 py-1 text-xs rounded-lg border"> <Plus className="stroke-1 text-dark font-semibold"/> create </button>
                </div>
            </form>
        </div>
    )
}