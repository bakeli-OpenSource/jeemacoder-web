import { useMutation } from "@tanstack/react-query"
import { ChangeEvent } from "react"
let authToken = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
}

export const getHackathons = async () => {
    const options = {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };
    try {
        const response = await fetch('http://localhost:8000/api/hackathons', options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('hackathons:', data);
        return data;
    } catch (err) {
        console.error('Fetch error:', err);
        throw err; // Rethrow the error so react-query can handle it
    }
};