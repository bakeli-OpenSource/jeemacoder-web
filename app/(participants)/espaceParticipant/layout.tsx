import { NavBar } from "@/app/components/patricipants/navBar";
import React from "react";

export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <div>
            <div className="h-9 border flex flex-start items-center px-5"><NavBar /> </div>
            <div className="flex flex-start items-center max-w-3xl border m-auto"> {children} </div>
        </div>
    )
}