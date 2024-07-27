import { Button } from "@/app/components/button";
import { HackDetailsCard } from "@/app/components/Card";
import { NavBar } from "@/app/components/home/navBar";
import { Globe } from "lucide-react";

export default function Details({params} : {params : any}) {
    return (
        <div>
            <div className="border">
                <NavBar />
            </div>
            <div className="max-w-5xl m-auto">
                <div className="flex gap-10">
                    <div className=" p-4 flex flex-col gap-5">
                            <div className="flex gap-10">
                                <div className="w-20 h-20 border rounded-lg"></div>
                                <h1 className="text-3xl font-semibold"> Jeemacoder 2024 </h1>
                        </div>
                        <div className="text-lg font-semibold">
                            <p className="text-sm bg-muted p-4 border rounded-md mb-5 text-dark">Venez relever le defi du code </p>
                            <Button types="button" size="small" className="bg-dark text-white ">
                                Participer
                            </Button>
                        </div>
                        <div>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam iusto eum quia cum reprehenderit consequuntur error enim ipsam obcaecati quos, consequatur, nulla, quis ullam asperiores natus? Sapiente, nemo quisquam. </p>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam iusto eum quia cum reprehenderit consequuntur error enim ipsam obcaecati quos, consequatur, nulla, quis ullam asperiores natus? Sapiente, nemo quisquam. </p>
                        </div>
                    </div>
                    <div className="p-4 border min-w-[400px]">
                        <HackDetailsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}