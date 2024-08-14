import { Cross1Icon, CheckIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { getParticipants, approveParticipant, rejectParticipant, approveParticipantEquipe, rejectParticipantEquipe, createWorkspace } from "@/app/utils/api/data";
import { Individuel, Equipe, ParticipantsResponse } from '@/app/utils/definitions';
import Image from "next/image";

interface Participant extends Individuel, Equipe {
    type: 'Solo' | 'Équipe';
}
interface Props {
    hackathonId: string;
}

export const EnrolementParticipants: React.FC<Props> = ({ hackathonId }) => {
    const [participants, setParticipants] = useState<(Individuel | Equipe)[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response: ParticipantsResponse = await getParticipants(hackathonId);
                console.log("Data received from API:", response);

                if (response.success) {
                    // Combine both Individuels and Equipes into a single array
                    const combinedParticipants = [
                        ...response.Individuels.map(participant => ({ ...participant, type: 'Solo' })),
                        ...response.Equipes.map(participant => ({ ...participant, type: 'Équipe' }))
                    ];
                    setParticipants(combinedParticipants);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        };

        fetchParticipants();
    }, [hackathonId]);

    const handleStatusUpdate = async (id: string, status: 'accepté' | 'refusé', name: string, type: string) => {
        try {
            if (status === 'accepté') {
                if (type === 'Solo') {
                    await approveParticipant(id);
                    console.log('Name : ', name);
                    console.log('typeEspace : ', type);
                    console.log('Participant ID : ', id);
                    await createWorkspace(name, 'individuel', id);
                } else if (type === 'Équipe') {
                    await approveParticipantEquipe(id);
                    console.log('Participant ID : ', id);
                    await createWorkspace('cgfg', 'equipe', id);
                }
            } else {
                if (type === 'Solo') {
                    await rejectParticipant(id);
                } else if (type === 'Équipe') {
                    await rejectParticipantEquipe(id);
                }
            }
            setParticipants((prevParticipants) =>
                prevParticipants.map((participant) =>
                    participant.id === id ? { ...participant, status } : participant
                )
            );
        } catch (error) {
            console.error("Error updating participant status:", error);
        }
    };

    const waitingParticipants = participants.filter(participant => participant.status === 'attente');

    const totalPages = Math.ceil(waitingParticipants.length / itemsPerPage);
    const currentParticipants = waitingParticipants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Enrôlement</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Type</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Photo</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Nom</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Prénom</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Motivation</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Validation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentParticipants.map((participant) => (
                            <tr key={participant.id}>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.type}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <Image
                                        src={participant.user?.photo || '/default-avatar.png'}
                                        alt={`${participant.user?.firstname || 'N/A'} ${participant.user?.lastname || 'N/A'}`}
                                        className="w-12 h-12 rounded-full"
                                        width={100}
                                        height={100}
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.user?.firstname || 'N/A'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.user?.lastname || 'N/A'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.motivation || 'N/A'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <div className="flex space-x-2">
                                        <button
                                            title="Reject"
                                            className="text-red-500 hover:bg-red-100 rounded p-1"
                                            onClick={() => handleStatusUpdate(participant.id, 'refusé', participant.user?.firstname || '', participant.type)}
                                        >
                                            <Cross1Icon />
                                        </button>
                                        <button
                                            title="Validate"
                                            className="text-green-500 hover:bg-green-100 rounded p-1"
                                            onClick={() => handleStatusUpdate(participant.id, 'accepté', participant.user?.firstname || '', participant.type)}
                                        >
                                            <CheckIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button
                        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-orange-400 text-white"}`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-orange-400 text-white"}`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
