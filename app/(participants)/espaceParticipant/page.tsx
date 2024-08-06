import { SmallHackthonCard } from "@/app/components/dashboards/small-hackhton-card";
import { hackathons } from "@/app/utils/placeholder-data";
import Image from "next/image";

export default function Page () {

    return(
         <div>
            <h1 className="my-5"> Mes projets </h1>

            <div className="w-80 h-32 border rounded-md bg-gradient-radial-home flex items-center text-white justify-center font-bold">
                Click to see
            </div>            
         </div>
    )
}