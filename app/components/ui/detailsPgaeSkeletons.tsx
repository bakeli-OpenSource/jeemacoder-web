import { Globe } from "lucide-react"
import { DetailsCardItem } from "../Card"

export const DetailsPageSkeletons = () => {
    return (
        <div className="max-w-5xl m-auto my-10 animate-pulse flex gap-10">
        <div>
            <div className=" p-4 flex gap-5">
                <div className="flex gap-10 bg-gray-foreground w-40 h-36">
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="bg-gray-foreground w-64 h-10  rounded-2xl"> </h1>
                    <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
                </div>
            </div>
            <p className="bg-gray-foreground w-80 pl-4 h-5 rounded-2xl my-5"></p>
            <p className="bg-gray-foreground w-80 pl-4 h-5 rounded-2xl"></p>
            </div>
            <div className="max-w-2xl shadow-md flex flex-col gap-5 p-5">
            <div className="flex gap-5">
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
            </div>
            <div className="flex gap-5">
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
            </div>
            <div className="flex gap-5">
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
            </div>
            <div className="flex gap-5">
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
            </div>
                <p className="bg-gray-foreground w-64 h-5 rounded-2xl"></p>
            </div>
        </div>
    )
}