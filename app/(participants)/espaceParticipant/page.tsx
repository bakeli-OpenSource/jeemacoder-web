"use client";
import { useEffect, useState } from 'react';
import { SmallHackthonCard } from "@/components/dashboards/small-hackhton-card";
import { getUserHackathon, getUserIndividuel } from "@/app/utils/api/dataParticipant";
import Image from "next/image";
import hackathonlogoLoader from '@/app/utils/hackathonlogoLoader';
import { useUserContext } from '@/app/utils/context';

interface HackathonData {
  logo_url: string;
  
}

export default function Page() {
    const user = useUserContext();
    const [data, setData] = useState<HackathonData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.id) {
                console.log('User not loaded or user ID is undefined');
                setIsError(true);
                setIsLoading(false);
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
            {data.logo_url ? (
                <div className="w-80 h-32 border rounded-md bg-gradient-radial-home flex items-center text-white justify-center font-bold">
                    <Image
                        src={data.logo_url}
                        loader={hackathonlogoLoader}
                        alt='logo hackathon'
                        width={320}
                        height={180}
                        className='w-full'
                    />
                </div>
            ) : (
                <div className="w-80 h-32 border rounded-md bg-gradient-radial-home flex items-center text-white justify-center font-bold">
                    <p>Aucun logo disponible</p>
                </div>
            )}
        </div>
    );
}
