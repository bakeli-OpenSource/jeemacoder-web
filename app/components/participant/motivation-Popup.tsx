"use client"
import { ChangeEvent, useState } from "react"
import { Button } from "../button"

const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
}

export const MotivationPopup = () => {
    const [motivation , setMotivation] = useState('')
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