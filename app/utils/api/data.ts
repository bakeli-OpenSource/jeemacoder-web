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
    try {
        // Requête pour récupérer les participants individuels
        const indivResponse = await fetch(`http://localhost:8000/api/indiv/index/${hackathonId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authToken}`
            },
        });

        if (!indivResponse.ok) {
            if (indivResponse.status === 404) {
                throw new Error('Hackathon non trouvé');
            } else if (indivResponse.status === 403) {
                throw new Error('Accès refusé');
            } else {
                throw new Error('Échec de la récupération des participants individuels');
            }
        }

        // Requête pour récupérer les équipes
        const equipeResponse = await fetch(`http://localhost:8000/api/equipe/index/${hackathonId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authToken}`
            },
        });

        if (!equipeResponse.ok) {
            if (equipeResponse.status === 404) {
                throw new Error('Hackathon non trouvé');
            } else if (equipeResponse.status === 403) {
                throw new Error('Accès refusé');
            } else {
                throw new Error('Échec de la récupération des équipes');
            }
        }

        // Convertir les réponses en JSON
        const indivData = await indivResponse.json();
        const equipeData = await equipeResponse.json();

        // Combiner les données des deux endpoints
        return {
            success: true,
            Individuels: indivData.Individuels || [],
            Equipes: equipeData.Equipes || [],
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des participants:", error);
        throw error;
    }
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

export const approveParticipantEquipe = async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/equipe/approuver/${id}`, {
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

export const rejectParticipantEquipe = async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/equipe/rejete/${id}`, {
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

export const createWorkspace = async (name: string, type_espace: string, equipe_id: string) => {
    const options = {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, type_espace, equipe_id }),
    };
    try {
        const response = await fetch(`http://localhost:8000/api/workspace/add`, options);
        if (!response.ok) {
            const errorText = await response.text(); // Lire le texte de la réponse d'erreur
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }
        const data = await response.json();
        console.log('Workspace created:', data);
        return data;
    } catch (err) {
        console.error('Erreur lors de la création de l\'espace de travail:', err);
        throw err;
    }
};
