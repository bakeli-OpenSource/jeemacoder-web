"use client"
import { Hackathon } from "@/app/utils/definitions";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/form/button";
import FormInput from "@/components/form/input";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Undo2, Upload } from "lucide-react";
import Link from "next/link";
import { Modal, YesOrNoModal } from "@/components/modal";

let authToken: string | null = null;
if (typeof window !== "undefined") {
    authToken = localStorage.getItem('authToken');
}

export default function Page() {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const nowdate = `${date.getDate()}-0${date.getMonth()}-${date.getFullYear()}`;
    const nowDate = JSON.stringify(nowdate);
    const [value, setValue] = useState<Hackathon>({
        name: '',
        date_debut: nowDate,
        heure_debut: "08:00",
        heure_fin: "20:00",
        date_fin: nowDate,
        date_limite: '2024-07-02',
        slogan: '',
        lieu: '',
        prix: '',
        structure_organisateur: '',
        logo_url: '',
        theme: '',
        description: ''
    });

    const [description, setDescription] = useState('une description de votre hackathon');
    const [theme, setTheme] = useState('vert');
    const [logo_url, setLogo_Url] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();
    
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('https://api.jeemacoder.fewnu.app/api/hackathons/create', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${authToken}`
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to create hackathon');
            }
            if(response.ok){
                router.replace('dashboard')
            }
            return response.json();
        }
    });

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);  // Reset error state before submitting

        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('date_debut', value.date_debut);
        formData.append('date_fin', value.date_fin);
        formData.append('date_limite', value.date_limite);
        formData.append('heure_debut', value.heure_debut);
        formData.append('heure_fin', value.heure_fin);
        formData.append('lieu', value.lieu);
        formData.append('structure_organisateur', value.structure_organisateur);
        formData.append('prix', value.prix);
        formData.append('description', description);
        formData.append('slogan', value.slogan);
        formData.append('theme', theme);
        formData.append('status', "ouvert");
        if (logo_url) formData.append('logo_url', logo_url);

        mutation.mutate(formData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        setValue({ ...value, [input.id]: input.value });
    };

    const [showModal, setShowModal] = useState<boolean>(false);
    const onCloseModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="">
            <div className="max-w-4xl m-auto my-1 p-10 rounded-md border">
                <div className="">
                    <div onClick={onCloseModal} className="border cursor-pointer flex items-center gap-2 max-w-32 py-1 rounded-md justify-center">
                        <Undo2 className="stroke-1 size-3" /> <span>Retour</span>
                    </div>
                    <p className="py-5 text-4xl text-dark font-normal">Commencez à créer votre hackathon</p>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={onSubmit} className="flex flex-col gap-5 pb-20">
                        <label htmlFor="logo_url" className="mb-2 text-sm font-semibold flex flex-col gap-2 items-center border rounded-md max-w-xs py-5 border-white">
                            <Upload />
                            <p>Ajouter votre logo {logo_url?.name}</p>
                        </label>
                        <input
                            placeholder="nom"
                            type="file"
                            accept=".jpg,.png,.svg"
                            id="logo_url"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setLogo_Url(e.target.files[0]);
                                }
                            }}
                            className="hidden"
                        />
                        <div className="space-y-4 w-full">
                        <div className="grid grid-cols-2 gap-4">
                        <Input
                            id="name"
                            value={value.name}
                            onChange={handleChange}
                            placeholder="ex : Jeemacoder 2024"
                            label="Entrez le nom de votre hackathon"
                            className="px-4 py-1 rounded-md max-w-80 border font-medium outline-none focus:border-gray-foreground text-sm placeholder:text-sm"
                        />
                       
                        <Input
                            id="slogan"
                            value={value.slogan}
                            onChange={handleChange}
                            placeholder="Entrez votre slogan"
                            label="Entrez votre slogan"
                        />
                                <Input
                                    id="structure_organisateur"
                                    value={value.structure_organisateur}
                                    onChange={handleChange}
                                    placeholder="ex: le defi a relever"
                                    label="Nom de l'organisateur"
                                    className="w-full"
                                />
                                <Input
                                    id="lieu"
                                    value={value.lieu}
                                    onChange={handleChange}
                                    placeholder="Entrez le lieu"
                                    label="Lieu"
                                />
                            </div>
                            <p className="py-3 text-dark">Information sur les dates et les horaires du déroulement de l&apos;hackathon</p>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    type="date"
                                    id="date_debut"
                                    value={value.date_debut}
                                    onChange={handleChange}
                                    placeholder="ex: 2024-05-22"
                                    label="Date de démarrage"
                                />
                                <Input
                                    type="time"
                                    id="heure_debut"
                                    value={value.heure_debut}
                                    onChange={handleChange}
                                    placeholder="ex: 2024-05-22"
                                    label="Heure de démarrage"
                                />
                                <Input
                                    type="date"
                                    id="date_fin"
                                    value={value.date_fin}
                                    onChange={handleChange}
                                    placeholder="ex: 2024-05-22"
                                    label="Date de fin"
                                />
                                <Input
                                    type="time"
                                    id="heure_fin"
                                    value={value.heure_fin}
                                    onChange={handleChange}
                                    placeholder="ex: 2024-05-22"
                                    label="Heure de fin"
                                />
                            </div>
                            <div>
                            <p className="py-3 text-[#F47E11]">Description : mettez une description détaillée de ce que sera votre hackathon</p>
                            <textarea
                                placeholder="Description"
                                id="description"
                                value={description}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                rows={5}
                                className="w-full text-dark outline-none border rounded-lg p-3 bg-transparent focus:border-[#F47E11]"
                            />
                        </div>
                            <div className="">
                                <Input
                                    type="date"
                                    id="date_limite"
                                    value={value.date_limite}
                                    onChange={handleChange}
                                    placeholder="ex: 2024-05-22"
                                    label="Date limite des inscriptions - après cette date toute inscription sera interdite"
                                    className="max-w-[300px]"
                                />
                            </div>
                            <div className="flex gap-5">
                                <Input
                                    id="prix"
                                    value={value.prix}
                                    onChange={handleChange}
                                    label="Prix"
                                    placeholder="ex : finance"
                                />
                                <div className="">
                                    <p>Thème</p>
                                    <select
                                        title="theme"
                                        className="w-40 px-4 py-2 outline-none"
                                        value={theme}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)}
                                    >
                                        <option value="orange">orange</option>
                                        <option value="vert">vert</option>
                                        <option value="neutre">neutre</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-32 float-left mt-10">
                            <Button type="submit" className="">
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
                <div></div>
            </div>

            <Modal onClose={onCloseModal} showModal={showModal} className="pt-10">
                <YesOrNoModal onClose={onCloseModal} href="/dashboard" />
            </Modal>
        </div>
    );
}

const Input = ({
    id,
    type = "text",
    value,
    placeholder,
    className,
    label,
    required,
    onChange,
}: {
    id?: string;
    type?: string;
    value: string | number;
    placeholder: string;
    className?: string;
    label?: string;
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label className="translate-x-3 text-sm">{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={onChange}
                className={clsx(
                    "outline-none px-3 py-2 text-dark rounded-md w-60 text-xs border bg-transparent focus:border-dark",
                    { className }
                )}
            />
        </div>
    );
};
