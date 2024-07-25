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


export default function Page() {
    
    const {data , isLoading , isError} = useQuery({
        queryFn : async () => await getHackathons(),
        queryKey : ["hackathons"],
    }); 
    const router = useRouter()
    const [showDetails , setShowDetails] = useState<boolean>(false)
    const onClose = () => {
        setShowDetails(!showDetails)
    }
        
    return (<div className="max-w-4xl m-auto py-12 flex flex-col gap-10">
        <div>
            <input type="text" placeholder="Rechercher"
            className="border outline-none w-80 px-4 py-2 rounded-md" />
        </div>
        <div>
          {
            isLoading ? <HackathonCardSkeleton /> : 
            <ListItem 
                items={hackathons}
                resourcename="hackathons"
                component={HackathonCard}
                className=""
                onClick={()=> { setShowDetails(!showDetails) } }
                withPopup={true}
                href="listhackathons"
            />
          }
          {isError && <div> fetching data failed </div> }
        </div>
        <Modal showModal={showDetails} onClose={() => setShowDetails(!showDetails)} >
            <div className="max-w-3xl bg-muted m-auto rounded-md p-5">
                <div className="flex gap-5">
                <div  className="flex gap-3 ">
                    <div className="w-28 h-28 bg-white rounded-md"></div>
                    <div>
                        <h1 className="text-2xl"> Jeemacoder 2024 </h1>
                        <p className="border rounded-lg bg-muted inline-block px-4 m-1"> tag 1 </p>
                        <p className="border rounded-lg bg-muted inline-block px-4 m-1"> tag 1 </p>
                        <p className="border rounded-lg bg-muted inline-block px-4 m-1"> tag 3 </p>
                    </div>
                </div>
                <div className="max-w-xl border p-2 rounded-md">
                    <p>Bakeli school of technologie</p>
                    <p> 2026-01-17 </p>
                    <p> 2026-01-17 </p>
                </div>
                </div>
                <div className="py-5 text-white">
                    <p className="">Description</p>
                    <span>salut a tout le monde salut a tout le monde salut a tout le monde sal </span>
                    <span>salut a tout le monde salut a tout le monde salut a tout le monde salut a tout le </span>
                    <span>salut a tout le monde salut a tout le monde salut a tout le monde salut a tout le </span>
                    <span>salut a tout le monde salut a tout le monde salut a tout le monde salut a tout le </span>
                </div>

            </div>
        </Modal>
    </div> )
}