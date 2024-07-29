"use client"
import { ListItem } from "@/app/components/regular_list";
import { hackathons } from "../utils/placeholder-data";
import { HackathonCard } from "@/app/components/dashboards/hackthon-card";
import { useState } from "react";
import { getHackathons } from "../utils/api/data";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@/app/components/modal";
import { HackathonCardSkeleton } from "@/app/components/ui/skeletons";
import { useRouter } from "next/navigation";
import { NavBar } from "../components/home/navBar";


export default function Page() {
    
    const {data , isLoading , isError} = useQuery({
        queryFn : async () => await getHackathons(),
        queryKey : ["hackathons"],
    }); 
    const router = useRouter()
    
    return ( <div>
        <div className="bg-dark z-10 sticky top-0">
        <NavBar />
        </div>
    <div className="max-w-4xl m-auto py-12 flex flex-col gap-10">
        <div>
            <input type="text" placeholder="Rechercher"
            className="border outline-none w-80 px-4 py-2 rounded-md" />
        </div>
        <div>
          {
            isLoading ? <HackathonCardSkeleton /> : 
            <ListItem 
                items={data || []}
                resourcename="hackathons"
                component={HackathonCard}
                className="flex flex-col gap-3 "
                />
            }
          {isError && <div> fetching data failed </div> }
        </div>
    </div>
    </div> )
}