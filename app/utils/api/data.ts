import { useMutation } from "@tanstack/react-query"
import { ChangeEvent } from "react"
let authToken: string | null = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
  }
export const getHackathons = async () => {
    const getData = async () => {
            const options = {
                method : "GET" ,
                headers : {
                    "accept" : "application/json",
                    "Authorization" : `Bearer ${authToken}`
                }
            }
        const response = fetch('http://localhost:8000/api/hackathons' , options)
            .then(response => response.json())
            .catch(err => console.log(err))
        
            return response
        }

        const data = await getData()
        
        return data
}

