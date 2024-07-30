import { Cross1Icon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const EnrolementParticipants = () => {
    const participants = [
        { id: 1, nom: "John", prenom: "Doe", projet: "Project A" },
        { id: 2, nom: "Jane", prenom: "Smith", projet: "Project B" },
        { id: 3, nom: "Alice", prenom: "Johnson", projet: "Project C" },
        { id: 4, nom: "Bob", prenom: "Brown", projet: "Project D" },
        { id: 5, nom: "Carol", prenom: "Wilson", projet: "Project E" },
        { id: 6, nom: "David", prenom: "Taylor", projet: "Project F" },
        { id: 7, nom: "Eve", prenom: "Martinez", projet: "Project G" },
        { id: 8, nom: "Frank", prenom: "Wright", projet: "Project H" },
        { id: 9, nom: "Grace", prenom: "Lee", projet: "Project I" },
        { id: 10, nom: "Hank", prenom: "Kim", projet: "Project J" },
        { id: 11, nom: "Ivy", prenom: "Clark", projet: "Project K" },
        { id: 12, nom: "Jack", prenom: "Turner", projet: "Project L" },
    ];

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(participants.length / itemsPerPage);

    const currentParticipants = participants.slice(
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
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Nom</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Prénom</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Projet</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left">Validation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentParticipants.map((participant) => (
                            <tr key={participant.id}>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.nom}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.prenom}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{participant.projet}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <div className="flex space-x-2">
                                        <button title="Reject" className="text-red-500 hover:bg-red-100 rounded p-1">
                                            <Cross1Icon />
                                        </button>
                                        <button title="Validate" className="text-green-500 hover:bg-green-100 rounded p-1">
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
