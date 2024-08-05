"use client"
import { Container } from "@/app/components/container";
import { SideBar } from "@/app/components/dashboards/sideBar";
import { openSans, roboto } from "@/app/components/ui/fonts";
import { getUser } from "@/app/utils/api/auth";
import { UserContext } from "@/app/utils/context"
import { useQuery } from "@tanstack/react-query";


export default function Layout ({children} : {children : React.ReactNode}) {
    const {data , isLoading , isError } = useQuery({
        queryKey : ["profil"],
        queryFn : async () => await getUser()
    })
    return (<div className={roboto.className}>
    <UserContext.Provider value={data}>
        <Container className="max-w-full flex  bg-muted max-sm:flex-1 max-sm:bg-white m-0">
            <div className=" h-screen pl-2 sticky max-sm:p-0">
                <SideBar />
            </div>
            <div className="w-full  p-5">
                <div className="bg-white h-full rounded-md">
                {children} 
                </div>
            </div>
        </Container>
    </UserContext.Provider>
        </div>)
}