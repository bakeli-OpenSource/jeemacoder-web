"use client"
import { ChangeEvent, useState } from "react";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTags } from "@/app/utils/api/data";
import { ListItem } from "../regular_list";
import { TagElement } from "./hackthon-card";

let authToken: string | null = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
  }
type Value = {hackathonId : string , tagName : string}
export const Tags = ({hackathonId} : {hackathonId : any}) => {

const [value , setValue ] = useState<Value>({
    tagName : "" , hackathonId : hackathonId
})
    
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        setValue({...value , [input.id] : input.value})
        }
    const mutation = useMutation({
        mutationFn: async(formData : BodyInit) => {
            return await fetch('https://api.jeemacoder.fewnu.app/api/tag/add' , {
            method : 'POST',
            headers : {
                "authorization" : `Bearer ${authToken}`
            }, 
            body : formData
            }).then((res) => console.log(res , 'les tags crée'))
            .catch((error) => console.log(error , "")
            )
        } ,
        onSuccess : () => {
            setValue({tagName :  "" , hackathonId})
        }
    })
    const {data , isLoading , isError} = useQuery({
        queryFn : async () => await getTags(hackathonId),
        queryKey : ["tags" , hackathonId]
    })
    

    const onSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
            formData.append('name' , value.tagName)
            formData.append('hackathon_id' , value.hackathonId)
            mutation.mutate(formData)
            
    // for(let [key , value] of formData.entries()) {
    // console.log(`${key} : ${value}`);}
    }
    return (
        <div className="flex gap-5 max-w-2xl py-8">
        <div className="max-w-xl">

            <form onSubmit={onSubmit}>
                <label htmlFor="tagName" className="text-sm py-1 font-medium ">Aider les personne a comprendre votre hackathon</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Ajoutez un tags"
                        value={value.tagName}
                        className="w-44 outline-none border placeholder:text-xs text-xs px-4 rounded-md py-2"
                        id="tagName"
                        onChange={handleChange}
                    />
                    <button type="submit" className="w-20 flex items-center justify-center px-2 gap-4 py-1 text-xs rounded-lg border"> 
                        <Plus className="stroke-1 text-dark font-semibold"/> 
                    </button>
                </div>
            </form>
        </div>
        <div className="border p-1 rounded-md">
            <span className="text-xs ">vos tags : </span>
            {isLoading && <p>Chargement...</p>}
                {!isLoading && !isError && data && (
                    <ListItem
                        items={data}
                        resourcename="tag"
                        component={TagElement}
                        className="flex"
                    />
                )}
                {isError && <p>Erreur lors du chargement des tags.</p>}
        </div>
    </div>
    )
}

