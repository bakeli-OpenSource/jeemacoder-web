"use client"
import { useState } from "react";
import { HackathonDetails } from "@/app/components/dashboards/hackathonDetails";
import { EnrolementParticipants } from "@/app/components/dashboards/enrolementParticipants";


export default function Page() {
    const [activeTab, setActiveTab] = useState("details");

    return (
        <div className="h-full overflow-auto border">
            <div className="w-full h-5 px-5 py-8">
                <h1 className="text-sm">Details</h1>
                <p className="text-xs text-[#636364]">Ici vous avez une vue générale de vos Hackathons</p>
            </div>
            <div className="flex space-x-4 px-5 py-4 border-b">
                <button
                    className={`py-2 px-4 rounded ${activeTab === "details" ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => setActiveTab("details")}
                >
                    Detail Hackathon
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === "enrolment" ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => setActiveTab("enrolment")}
                >
                    Enrolement
                </button>
            </div>
            <div className="p-5">
                {activeTab === "details" ? <HackathonDetails /> : <EnrolementParticipants />}
            </div>
        </div>
    );
}
