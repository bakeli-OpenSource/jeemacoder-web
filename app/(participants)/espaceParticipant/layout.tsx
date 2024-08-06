import { NavBar , SideBar } from "@/app/components/participant/navBar";
import React from "react";

export default function Layout({children} : {children : React.ReactNode}) {
    return (
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
    )
}