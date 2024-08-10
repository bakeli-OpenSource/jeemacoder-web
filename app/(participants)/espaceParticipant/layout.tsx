"use client";
import { NavBar, SideBar } from "@/components/participant/navBar";
import { getUser } from "@/app/utils/api/auth";
import { UserContext } from "@/app/utils/context";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["profil"],
        queryFn: async () => await getUser(),
    });

    console.log('Data Context : ', data);

    return (
        <UserContext.Provider value={data}>
            <div className="h-screen flex flex-col overflow-hidden">
                <header className="bg-gray-800 text-white border-b border-gray-700">
                    <div className="container mx-auto flex items-center justify-between px-5 py-3 max-w-full">
                        <NavBar />
                    </div>
                </header>
                <main className="flex flex-1 overflow-hidden">
                    <aside className="w-64  bg-gray-200 border-r border-gray-300 overflow-y-hidden">
                        <SideBar />
                    </aside>
                    <div className="flex-1 bg-gray-100 overflow-hidden">
                        {children}
                    </div>
                </main>
            </div>
        </UserContext.Provider>
    );
}
