import Image from "next/image";
import { ImgCollpsed } from "./img-collabsed";
import { Calendar } from "lucide-react";

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
            className="w-80 max-sm:h-60 bg-light-orange border rounded-xl p-4 flex flex-col justify-between cursor-pointer" 
            onClick={onClick}  // Ajout du gestionnaire de clic
        >
            <div className="flex gap-6 flex-col">
                <div className="flex gap-3">
                    <Image src={logo_url || '/default-logo.jpg'}
                        width={130} 
                        height={100} alt="logo_img"
                        className="border rounded-md max-sm:hidden"
                    />
                    <div>
                        <div className="flex items-center">
                            <Calendar stroke="1" />
                            <p className="mb-2 font-mono text-xs">{date_debut}</p>
                        </div>
                        <p className="flex font-bold">{status}</p>
                    </div>
                </div>
                <div className="hidden max-sm:flex gap-5">
                    <Image src='/hack_logo.jpg'
                        width={60} 
                        height={50} alt="logo_img"
                        className="border rounded-md"
                    />
                    <p className="flex font-bold">{status}</p>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">{name}</h1>
                    <p className="text-sm">{organisateur}</p>
                </div>
            </div>
            <div className="flex justify-between text-xs items-center">
                <div className="flex items-center text-xs">
                    <ImgCollpsed />
                </div>
            </div>
        </div>
    );
};
