"use client"
import { NavBar , SideBar } from "@/app/components/participant/navBar";
import { getUser } from "@/app/utils/api/auth";
import { UserContext } from "@/app/utils/context";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Layout({children} : {children : React.ReactNode}) {
    const {data , isLoading , isError } = useQuery({
        queryKey : ["profil"],
        queryFn : async () => await getUser()
    })
    console.log('Data Context : ',data);
    return (
        <UserContext.Provider value={data}>
        <div className="h-screen">
            <div className="h-9 border-b flex flex-start items-center px-5">
                <NavBar /> 
            </div>
            <div className="flex gap-5 h-full">
                <div className="border-r px-2">
                    <SideBar />
                </div>
                <div className=""> {children} </div>
            </div>
        </div>
        </UserContext.Provider>
    )
}