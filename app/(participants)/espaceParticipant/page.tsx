"use client";
import { useEffect, useState } from 'react';
import { SmallHackthonCard } from "@/app/components/dashboards/small-hackhton-card";
import { getUserHackathon, getUserIndividuel } from "@/app/utils/api/dataParticipant";
import Image from "next/image";
import hackathonlogoLoader from '@/app/utils/hackathonlogoLoader';
import { useUserContext } from '@/app/utils/context';

export default function Page() {
    const user = useUserContext();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log('User not loaded yet');
                return;
            }
            try {
                console.log("User ID : ", user.id);
                
                const result1 = await getUserIndividuel(user.id);
                console.log('Result from getUserIndividuel: ', result1);

                if (result1 && result1.hackathon_id) {
                    const result = await getUserHackathon(result1.hackathon_id);
                    console.log('Result from getUserHackathon: ', result);
                    setData(result);
                } else {
                    console.log('No hackathon_id found in result1');
                    setIsError(true);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    console.log('Final data: ', data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return <div>Error loading data</div>;
    }

    return (
        <div>
            <h1 className="my-5">Mes projets</h1>
            <div className="w-80 h-32 border rounded-md bg-gradient-radial-home flex items-center text-white justify-center font-bold">
                <Image
                    src={data.logo_url}
                    loader={hackathonlogoLoader}
                    alt='logo hackathon'
                    width={320} // Remplacez par la largeur réelle de l'image
                    height={180} // Remplacez par la hauteur réelle de l'image
                    className='w-full'
                />
            </div>
            {data && (
                <div>
                    {/* Affichez les données récupérées ici */}
                </div>
            )}
        </div>
    );
}
