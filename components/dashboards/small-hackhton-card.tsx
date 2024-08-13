import Image from "next/image";
import { ImgCollpsed } from "./img-collabsed";
import { Calendar } from "lucide-react";
import hackathonlogoLoader from "@/app/utils/hackathonlogoLoader";

export const SmallHackthonCard = ({
    hackathonCard,
    onClick
} : { 
    hackathonCard: {
        logo_url: string, 
        date_debut: string, 
        name: string, 
        organisateur: string,
        coordonateur: string, 
        status: 'avenir' | 'enCours' | 'finis',
    },
    onClick?: () => void  // Ajout du prop onClick
}) => {
    if (!hackathonCard) {
        return <div>Loading...</div>;
    }
    console.log("hackathonCard:", hackathonCard);
    
    const { logo_url, date_debut, name, organisateur, status } = hackathonCard;
    console.log("logo_url:", logo_url);
    
    return (
        <div 
            className="max-w-sm max-sm:h-60 bg-light-orange border rounded-xl p-4 flex justify-between cursor-pointer gap-5" 
            onClick={onClick}  // Ajout du gestionnaire de clic
        >
            <div>
            <Image src={`${logo_url}`}
                loader={hackathonlogoLoader}
                width={130} 
                height={100} alt="logo_img"
                className="border rounded-md max-sm:hidden"
                />
            </div>
            <div className="flex flex-col gap-3">
                <p> {date_debut} </p>
                <h1> {name} </h1>
                <div className="flex items-center text-xs">
                   <ImgCollpsed />
                   <span>+20participants</span>
                </div>
            </div>
        </div>
    );
};