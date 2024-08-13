"use client"
import { ListItem } from "@/components/regular_list";
import { hackathons } from "../utils/placeholder-data";
import { HackathonCard } from "@/components/dashboards/hackthon-card";
import { ChangeEvent, useState } from "react";
import { getHackathons } from "../utils/api/data";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@/components/modal";
import { HackathonCardSkeleton } from "@/components/ui/skeletons";
import { useRouter } from "next/navigation";
import { NavBar } from "../../components/home/navBar";


export default function Page() {
    const [search , setSearch ] = useState('')

    const {data , isLoading , isError} = useQuery({
        queryFn : async () => await getHackathons(),
        queryKey : ["hackathons"],
    }); 
    const filteredData = data?.filter((item : any) => {
        return search.toLowerCase() === "" ? item : 
        item.name.toLowerCase().includes(search);
    })

    const router = useRouter()
    
    return ( <div>
        <div className="bg-dark z-10 sticky top-0">
        <NavBar />
        </div>
    <div className="max-w-4xl m-auto py-12 flex flex-col gap-10">
        <div>
            <input type="text" placeholder="Rechercher" 
                value={search} onChange={(e : ChangeEvent<HTMLInputElement>) => 
                    { setSearch(e.target.value)}}
            className="border outline-none w-80 px-4 py-2 rounded-md" />
        </div>
        <div>
          {
            isLoading ? <HackathonCardSkeleton /> : 
            <ListItem 
                items={filteredData || []}
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