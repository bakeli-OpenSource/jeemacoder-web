import { Cross1Icon, CheckIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { getParticipants, approveParticipant, rejectParticipant } from "@/app/utils/api/data";
import { Individuel } from '@/app/utils/definitions'; // Assurez-vous que ce chemin est correct

interface Props {
    hackathonId: string;
}

export const EnrolementParticipants: React.FC<Props> = ({ hackathonId }) => {
    const [participants, setParticipants] = useState<Individuel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await getParticipants(hackathonId);
                console.log("Data received from API:", response);
                if (response.success && Array.isArray(response.Individuels)) {
                    setParticipants(response.Individuels);
                } else {
                    console.error("Expected an array of participants under 'Individuels', but got:", response);
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        };

        fetchParticipants();
    }, [hackathonId]);

    const handleStatusUpdate = async (id: string, status: 'accepté' | 'refusé') => {
        try {
            if (status === 'accepté') {
                await approveParticipant(id);
            } else {
                await rejectParticipant(id);
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

    // Filtrer les participants en attente
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
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <img
                                        src={participant.user.photo || '/default-avatar.png'} // Utilisez une image par défaut si photo est null
                                        alt={`${participant.user.firstname} ${participant.user.lastname}`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.user.firstname}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.user.lastname}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.motivation || 'N/A'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <div className="flex space-x-2">
                                        <button
                                            title="Reject"
                                            className="text-red-500 hover:bg-red-100 rounded p-1"
                                            onClick={() => handleStatusUpdate(participant.id, 'refusé')}
                                        >
                                            <Cross1Icon />
                                        </button>
                                        <button
                                            title="Validate"
                                            className="text-green-500 hover:bg-green-100 rounded p-1"
                                            onClick={() => handleStatusUpdate(participant.id, 'accepté')}
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
