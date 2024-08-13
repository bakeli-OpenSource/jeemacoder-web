import { useMutation } from "@tanstack/react-query"
import { ChangeEvent } from "react"
import { Hackathon, ParticipantsResponse } from "../definitions";
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

export const getHackathonsByHackathonsId = async (hackathonId : string) => {
    const options = {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };
    try {
        const response = await fetch(`http://localhost:8000/api/hackathons/organisateur/hackathon/${hackathonId}`, options);
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

export const getHackathonsByOrganisateurId = async (organisateur_id : string) => {
    const options = {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };
    try {
        const response = await fetch(`http://localhost:8000/api/hackathons/organisateur/${organisateur_id}`, options);
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

export const getHackathonById = async (hackathonId : string) => {
    const options = {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };
    try {
        const response = await fetch(`http://localhost:8000/api/hackathons/${hackathonId}` , options)
        const data = await response.json()
        // console.log("details : " , response.json());
        
        return data

    }catch(error){
        console.log( "fetch failed" , error);
    }
}

export const getTags = async ( hackathonId : string) => {
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }}

        try{
            const response = await fetch(`http://localhost:8000/api/tag/all/${hackathonId}` , options)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = response.json()
            return data
            
        }catch(error) {
            console.log(error , "fecthing data failed");
        }
}

export const updateHackathon = async (id: string, updatedData: Partial<Hackathon>) => {
    const response = await fetch(`http://localhost:8000/api/hackathons/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
             "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error('Failed to update hackathon');
    }

    return response.json();
};

export const getParticipants = async (hackathonId: string): Promise<ParticipantsResponse> => {
    const response = await fetch(`http://localhost:8000/api/indiv/index/${hackathonId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${authToken}`
        },
    });

    if (!response.ok) {
        // Gestion des erreurs basée sur le code de statut
        if (response.status === 404) {
            throw new Error('Hackathon non trouvé');
        } else if (response.status === 403) {
            throw new Error('Accès refusé');
        } else {
            throw new Error('Échec de la récupération des demandes de participation');
        }
    }

    // Retourne les données en format JSON
    return response.json(); // Assurez-vous que la structure de la réponse correspond à ParticipantsResponse
};

export const approveParticipant = async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/indiv/approuver/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${authToken}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to approve participant');
    }

    return response.json();
};

// Fonction pour rejeter un participant
export const rejectParticipant = async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/indiv/rejeter/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${authToken}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to reject participant');
    }

    return response.json();
};
