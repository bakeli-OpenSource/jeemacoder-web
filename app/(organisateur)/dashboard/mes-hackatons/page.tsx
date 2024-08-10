"use client";

import { getHackathonsByOrganisateurId } from "@/app/utils/api/data";
import { ListItem } from "@/components/regular_list_hackathon";
import { SmallHackathonCardSkelethon } from "@/components/ui/skeletons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SmallHackthonCard } from "@/components/dashboards/small-hackhton-card";
import { useUserContext } from "@/app/utils/context";

export default function Page() {
    const user = useUserContext();
    const router = useRouter();

    // Verifiez que user.id est défini avant de faire la requête
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => {
            if (user.id) {
                return await getHackathonsByOrganisateurId(user.id);
            } else {
                throw new Error("User ID is undefined");
            }
        },
        queryKey: ["hackathons"],
        enabled: !!user?.id // c'est pour m'assurez que la requête ne se lance que si user.id est défini
    });



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
                            className="grid grid-cols-2 gap-y-5"
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
