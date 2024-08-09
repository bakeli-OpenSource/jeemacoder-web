"use client";

import { Button } from "@/app/components/button";
import { HackathonTable } from "@/app/components/dashboards/hackathonsTableList";
import { SmallHackthonCard } from "@/app/components/dashboards/small-hackhton-card";
import { Modal } from "@/app/components/modal";
import { ListItem } from "@/app/components/regular_list";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { getHackathonsByOrganisateurId } from "@/app/utils/api/data";
import { useQuery } from "@tanstack/react-query";
import { SmallHackathonCardSkelethon } from "@/app/components/ui/skeletons";
import { useUserContext } from "@/app/utils/context";

export default function Page() {
    const user = useUserContext();
    const [showModal, setShowModal] = useState(false);

    // Vérifiez que user est défini et que user.id est disponible avant de faire la requête
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => {
            if (user && user.id) {
                return await getHackathonsByOrganisateurId(user.id);
            } else {
                throw new Error("User ID is undefined or user is undefined");
            }
        },
        queryKey: ['hackathons'],
        enabled: !!user?.id // Assurez-vous que la requête ne se lance que si user.id est défini
    });

    return (
        <div className="min-w-full h-full overflow-y-auto rounded-lg border-muted-foreground bg-white max-sm:border-none">
            <div className="w-full h-5 px-5 py-8 flex justify-between items-center max-sm:flex-col max-sm:py-1 max-md:px-1">
                <div>
                    <h1 className="text-sm">Dashboard</h1>
                    <p className="text-xs text-[#636364]"> Ici vous avez une vue générale de vos Hackathons </p>
                </div>
                <Button href="/createNewHackathon" types="link" size="small" className="border bg-[#F47E11] text-white text-sm">
                    Nouveau hackathon
                </Button>
            </div>

            <div className="flex gap-6 px-5 py-10 max-xl:grid max-xl:grid-cols-1">
                <div className="w-80 b-0 pt-5">
                    <h1 className="text-sm">Ajouter</h1>
                    <p className="text-xs text-[#636364]">Ajoutez un nouveau hackathon, personnalisez-le et offrez à vos participants une expérience unique.</p>
                    <div className="pt-5 flex items-center gap-2 font-semibold">
                        <Button types="button" size="small" href="" className="text-sm text-foreground-green">
                            <PlusCircledIcon />
                            Ajouter
                        </Button>
                    </div>
                </div>
                <div>
                    {isLoading ? (
                        <SmallHackathonCardSkelethon />
                    ) : (
                        <ListItem
                            items={data ? data.slice(0, 2) : []} // Assurez-vous que data est défini avant d'appeler slice
                            resourcename="hackathonCard"
                            component={SmallHackthonCard}
                            className="flex gap-3 max-md:grid max-md:grid-cols-1"
                        />
                    )}
                    {isError && <div>Fetching data failed</div>}
                </div>
            </div>
            <HackathonTable />
        </div>
    );
}
