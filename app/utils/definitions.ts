export type LinkData = {
    href : string,
    link : string,
    icon ?: React.ElementType,
    icon2 ?: React.ElementType
}

export type Hackathon = {
    name : string,
    structure_organisateur : string,
    lieu : string,
    date_debut : string,
    date_fin : string,
    date_limite : string,
    slogan : string,
    prix : string ,
    heure_debut: string,
    heure_fin : string,

}

export type User = {
    id: string;
    firstname: string;
    lastname: string;
    pays: string;
    ville: string;
    email: string;
    metier: string;
    role: string;
    photo: string;
    created_at: string;
    updated_at: string;
};

export type Individuel = {
    id: string;
    user: User; 
    hackathon_id: string; 
    motivation: string; 
    status: 'attente' | 'accepté' | 'refusé'; 
    created_at: string; 
    updated_at: string; 
};