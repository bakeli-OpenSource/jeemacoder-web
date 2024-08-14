"use client";
import { useUserRole } from "@/app/utils/hooks";
import { Button } from "@/components/form/button";
import FormInput from "@/components/form/input";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, Suspense, useState } from "react";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Value = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  metier: string;
  pays: string;
  ville: string;
};

export default function Page() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}

const Form = () => {
  const [value, setValue] = useState<Value>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    metier: "",
    pays: "",
    ville: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const role = useUserRole()?.toString();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setValue({ ...value, [input.id]: input.value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", value.firstname);
    formData.append("lastname", value.lastname);
    formData.append("pays", value.pays);
    formData.append("ville", value.ville);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("metier", value.metier);
    formData.append("role", role!);

    axios
      .post("http://localhost:8000/api/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSuccessMessage("Inscription réussie! Vous serez redirigé vers la page de connexion.");
        setTimeout(() => {
          router.push("/login");
        }, 3000); // Redirige après 3 secondes
      })
      .catch((error) => {
        setErrorMessage("Une erreur est survenue. Veuillez vérifier vos informations et réessayer.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <Link href="/user_role" className="self-start mb-6 ml-10 flex items-center gap-2 py-2 px-4 rounded-md text-blue-600 hover:text-blue-800 transition-colors">
        <Undo2 className="stroke-1 size-3" /> <span>Retour</span>
      </Link>
      <div className="flex flex-col md:flex-row justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Inscrivez-vous et participez à des hackathons</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <FormInput
                type="text"
                placeholder="Entrez votre prénom"
                value={value.firstname}
                className="w-full"
                label="Prénom"
                id="firstname"
                onChange={handleChange}
              />
              <FormInput
                type="text"
                placeholder="Entrez votre nom"
                value={value.lastname}
                className="w-full"
                label="Nom"
                id="lastname"
                onChange={handleChange}
              />
            </div>
            <FormInput
              type="email"
              placeholder="Entrez votre email"
              value={value.email}
              className="w-full"
              label="Email"
              id="email"
              onChange={handleChange}
            />
            <FormInput
              type="password"
              placeholder="********"
              value={value.password}
              className="w-full"
              label="Mot de passe"
              id="password"
              onChange={handleChange}
            />
            <FormInput
              type="text"
              placeholder="Entrez votre profession"
              value={value.metier}
              className="w-full"
              label="Profession"
              id="metier"
              onChange={handleChange}
            />
            <div className="flex flex-col md:flex-row gap-4">
              <FormInput
                type="text"
                placeholder="Entrez votre pays"
                value={value.pays}
                className="w-full"
                label="Pays"
                id="pays"
                onChange={handleChange}
              />
              <FormInput
                type="text"
                placeholder="Entrez votre ville"
                value={value.ville}
                className="w-full"
                label="Ville"
                id="ville"
                onChange={handleChange}
              />
            </div>
            <Button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              S inscrire
            </Button>
          </form>

          {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
          {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}

          <div className="mt-6 text-center text-gray-600">
            Vous avez déjà un compte ?
            <Link href="/login" className="text-blue-600 font-semibold underline ml-2">
              Se connecter
            </Link>
          </div>
        </div>

        {role === "organisateur" && (
          <div className="hidden md:block md:w-1/2">
            <Image src="/img.jpg" width={500} height={350} alt="Hackathon" className="object-cover w-full h-full" />
          </div>
        )}
      </div>
    </div>
  );
};
