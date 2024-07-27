"use client"
import { useUserRole } from "@/app/utils/useUserRole";
import { Button } from "@/app/components/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { Undo2 } from "lucide-react";

export default function Page() {
    const  organisateur = 'organisateur'
    const participant = 'participant'
  const validation = useUserRole()?.toString()
  const [selectOrg , setSelectOrg] = useState("selected")
  const [selectPart , setSelectPart] = useState("unSelected")

    return ( <div className="h-screen p-10">
        <Link href="/user_role" className=" border flex items-center gap-2 max-w-32 py-1 rounded-md justify-center" >
          <Undo2 className="stroke-1 size-3"/> <span>Retour</span>
      </Link>
    <div className="h-full max-w-2xl justify-center items-center flex flex-col m-auto gap-3">
        <div className="text-xl pb-5"> Vous souhaitez nous rejoindre en tant que : </div>
        
        <div className="flex gap-6">
        <Link href={{
            pathname : "/user_role",
            query: {
                role : participant
            },
        }}
        className={selectOrg}
        onClick={() => {if(selectOrg == "selected"){setSelectPart("unSelected")}else if(selectPart == "selected"){setSelectPart("unSelected") ; setSelectOrg('selected')} }}
        >
            <h1 className="text-lg font-semibold ">Participant</h1>
            <p className="text-sm font-thin"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum inventore, minima tempora ad repellendus quas in eaque accusantium dolore. </p>
        </Link>
        <Link href={{
            pathname : "/user_role",
            query: {
                role : organisateur
            },
        }}
        className={selectPart}
        onClick={() => {
            if(selectPart == "selected")
                {setSelectOrg("unSelected")}
            else if(selectOrg == "selected" ){
                setSelectOrg("unSelected"); 
                setSelectPart('selected')} 
            }}
        >
             <h1 className="text-lg font-semibold ">Organisateur</h1>
            <p className="text-sm font-thin"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum inventore, minima tempora ad repellendus quas in eaque accusantium dolore. </p>
        </Link>
        </div>


        <Button 
            size="large" 
            types="link" 
            href={`/register?role=${validation}`}
            className="mt-10 flex items-center gap-3 w-40"
            >
            continuer <ChevronRightIcon />
        </Button>
    </div>
    </div>)
}
