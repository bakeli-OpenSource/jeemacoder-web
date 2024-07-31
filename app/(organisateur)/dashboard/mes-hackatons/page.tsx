"use client"
import { getHackathons } from "@/app/utils/api/data";
import { ListItem } from "@/app/components/regular_list_hackathon";
import { SmallHackathonCardSkelethon } from "@/app/components/ui/skeletons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SmallHackthonCard } from "@/app/components/dashboards/small-hackhton-card";

export default function Page() {
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await getHackathons(),
        queryKey: ["hackathons"],
    });


    const router = useRouter();

    const handleCardClick = (id: string) => {
        router.push(`/dashboard/mes-hackatons/details/${id}`);
    };

    return ( 
        <div className="h-full overflow-auto">
            <div className="w-full h-5 px-5 py-8"> 
                <div>
                    <h1 className="text-sm">Tous les projets</h1>
                    <p className="text-xs text-[#636364]"> Ici vous avez une vue générale de vos Hackathons </p>
                </div>
            </div>
            <div className="max-w-4xl m-auto py-12 flex flex-col gap-10">
                <div>
                    {isLoading ? (
                        <SmallHackathonCardSkelethon />
                    ) : (
                        <ListItem 
                            items={data}
                            resourcename="hackathonCard"
                            component={SmallHackthonCard}
                            className=""
                            onClick={(item) => handleCardClick(item.id)}
                            withPopup={false}
                            href=""  // Pas besoin de href ici
                        />
                    )}
                    {isError && <div> fetching data failed </div>}
                </div>
            </div>
        </div>
    );
}
