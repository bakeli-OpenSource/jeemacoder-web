"use client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import FormInput from "../formDetailsHackathon/input";
import { Button } from "../formDetailsHackathon/button";
import { Hackathon } from "@/app/utils/definitions";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getHackathonsByHackathonsId, updateHackathon } from "@/app/utils/api/data";
import { useRouter } from 'next/navigation';
import hackathonlogoLoader from "@/app/utils/hackathonlogoLoader";
import { Tags } from "./tags";

// Définition des props pour le composant
interface Props {
    hackathonId: string;
}

export const HackathonDetails: React.FC<Props> = ({ hackathonId }) => {
    const router = useRouter();

    // Requête pour obtenir les détails du hackathon
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await getHackathonsByHackathonsId(hackathonId),
        queryKey: ["hackathon", hackathonId],
    });

    // État pour gérer les champs modifiables et les valeurs du formulaire
    const [editableField, setEditableField] = useState<string | null>(null);
    const [value, setValue] = useState<Hackathon | null>(null);

    // Effet pour mettre à jour les valeurs du formulaire lorsque les données sont récupérées
    useEffect(() => {
        if (data) {
            setValue(data);
        }
    }, [data]);

    const handleEditClick = (field: string) => {
        setEditableField(field === editableField ? null : field);
    };

    const mutation = useMutation({
        mutationFn: async () => {
            if (!value) return ;
            await updateHackathon(hackathonId, value);
        },
        onSuccess: () => {
            router.refresh(); 
        },
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading hackathon details</div>;

    if (!value) return null; 

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center gap-5">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                        <Image src={`${value.logo_url}`} loader={hackathonlogoLoader} layout="fill" objectFit="cover" alt="Hackathon Image" />
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <FormInput
                            id="name"
                            value={value.name}
                            placeholder=""
                            className="w-full"
                            onChange={(e) => setValue({ ...value, name: e.target.value })}
                            readOnly={editableField !== 'name'}
                        />
                        <div className="p-2">
                            <Pencil1Icon 
                                className="hover:bg-gray-200 rounded-full cursor-pointer transition duration-300 ease-in-out" 
                                onClick={() => handleEditClick('name')} 
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex gap-3">
                    <textarea
                        placeholder="Description"
                        title=""
                        rows={5}
                        className="w-full outline-none p-4 rounded-lg border bg-gray-50 transition duration-300 ease-in-out hover:bg-white focus:bg-white"
                        readOnly={editableField !== 'description'}
                        value={value.description || "Description not available"}
                        onChange={(e) => setValue({ ...value, description: e.target.value })}
                    />
                    <div className="p-2">
                        <Pencil1Icon 
                            className="hover:bg-gray-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
                            onClick={() => handleEditClick('description')} 
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center gap-2 w-full">
                        <FormInput
                            id="organisateur"
                            value={value.structure_organisateur}
                            placeholder=""
                            onChange={(e) => setValue({ ...value, structure_organisateur: e.target.value })}
                            label="Organisateur"
                            readOnly={editableField !== 'organisateur'}
                            className="w-full"
                        />
                        <div className="p-2">
                            <Pencil1Icon 
                                className="hover:bg-gray-200 rounded-full cursor-pointer transition duration-300 ease-in-out" 
                                onClick={() => handleEditClick('organisateur')} 
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <FormInput
                            id="lieu"
                            value={value.lieu}
                            placeholder=""
                            onChange={(e) => setValue({ ...value, lieu: e.target.value })}
                            label="Lieu"
                            readOnly={editableField !== 'lieu'}
                            className="w-full"
                        />
                        <div className="p-2">
                            <Pencil1Icon 
                                className="hover:bg-gray-200 rounded-full cursor-pointer transition duration-300 ease-in-out" 
                                onClick={() => handleEditClick('lieu')} 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 w-full">
                        <FormInput
                            id="date_debut"
                            value={value.date_debut}
                            placeholder=""
                            type="date"
                            onChange={(e) => setValue({ ...value, date_debut: e.target.value })}
                            label="Date de début"
                            readOnly={editableField !== 'date_debut'}
                            className="w-full"
                        />
                        <div className="p-2">
                            <Pencil1Icon 
                                className="hover:bg-gray-200 rounded-full cursor-pointer transition duration-300 ease-in-out" 
                                onClick={() => handleEditClick('date_debut')} 
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <FormInput
                            id="date_fin"
                            value={value.date_fin}
                            placeholder=""
                            type="date"
                            onChange={(e) => setValue({ ...value, date_fin: e.target.value })}
                            label="Date de fin"
                            readOnly={editableField !== 'date_fin'}
                            className="w-full"
                        />
                        <div className="p-2">
                            <Pencil1Icon 
                                className="hover:bg-gray-200 rounded-full cursor-pointer transition duration-300 ease-in-out" 
                                onClick={() => handleEditClick('date_fin')} 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-full">
                        <FormInput
                            id="prix"
                            value={value.prix}
                            placeholder=""
                            onChange={(e) => setValue({ ...value, prix: e.target.value })}
                            label="Prix"
                            readOnly={editableField !== 'prix'}
                            className="w-full"
                        />
                        <div className="p-2">
                            <Pencil1Icon 
                                className="hover:bg-gray-200 rounded-full cursor-pointer transition duration-300 ease-in-out" 
                                onClick={() => handleEditClick('prix')} 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-medium text-gray-900 mb-1">Thème</label>
                        <select 
                            title="Theme" 
                            name="Theme" 
                            className="outline-none border p-3 rounded-md bg-gray-50 transition duration-300 ease-in-out hover:bg-white focus:bg-white w-full"
                            value={value.theme || 'orange'}
                            onChange={(e) => setValue({ ...value, theme: e.target.value })}
                            disabled={editableField !== 'theme'}
                        >
                            <option value="orange">Orange</option>
                            <option value="vert">Vert</option>
                            <option value="bleu">Bleu</option>
                        </select>
                    </div>
                </div>
                

                <Button 
                    type="submit" 
                    className="mt-4 bg-orange-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Enregistrement...' : 'Modifier'}
                </Button>
            </form>
                <Tags hackathonId={hackathonId} />
            
        </div>
    );
};
