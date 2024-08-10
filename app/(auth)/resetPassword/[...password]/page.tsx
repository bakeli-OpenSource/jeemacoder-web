"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent } from 'react';
import { Button } from "@/components/form/button";
import FormInput from "@/components/form/input";
import axios from "axios";
import { Undo2 } from "lucide-react";
import Link from "next/link";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<{ password: string; confirmPassword: string }>({ password: '', confirmPassword: '' });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Extract query parameters from the URL
    const query = new URLSearchParams(window.location.search);
    setToken(query.get('token'));
    setEmail(query.get('email'));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setValue({ ...value, [input.id]: input.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});
    setSuccess(null);

    if (value.password !== value.confirmPassword) {
      setError({ confirmPassword: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (!token || !email) {
      setError({ general: 'Paramètres manquants dans l\'URL' });
      return;
    }

    const formData = {
      password: value.password,
      password_confirmation: value.confirmPassword,
      token: token,
      email: email,
    };

    console.log('Formdata : ', formData);

    try {
      const res = await axios.post('http://localhost:8000/api/password/reset', formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('res : ', res.data);
      
      if (res.data.message === 'Réinitialisation du mot de passe réussie') {
        setSuccess('Votre mot de passe a été réinitialisé avec succès.');
        setValue({ password: '', confirmPassword: '' }); // Efface les champs
        setTimeout(() => {
          router.replace('/login'); // Redirige vers la page de connexion
        }, 2000); // Attendre 2 secondes pour montrer le message de succès
      } else {
        setError({ general: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
      }
    } catch (error) {
      setError({ general: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
      console.log("error", error);
    }
  };

  return (
    <div className="h-screen p-10">
      <Link href="/user_role" className="border flex items-center gap-2 max-w-32 py-1 rounded-md justify-center">
        <Undo2 className="stroke-1 size-3" /> <span>Retour</span>
      </Link>
      <div className="flex justify-center items-center max-w-4xl m-auto">
        <div className="m-auto flex flex-col gap-20 justify-center items-center py-10 px-20 rounded-md">
          <form className="w-[420px]" onSubmit={handleSubmit}>
            <h1 className="my-5 text-lg">Définissez un nouveau mot de passe</h1>
            {error.general && <div className="text-red-500"> {error.general} </div>}
            {success && <div className="text-green-500"> {success} </div>}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-5">
                <FormInput
                  id="password"
                  type="password"
                  placeholder="*********"
                  value={value.password}
                  onChange={handleChange}
                  className=""
                  label="Nouveau mot de passe"
                />
                {error.password && <div className="text-red-500"> {error.password} </div>}
                <FormInput
                  id="confirmPassword"
                  type="password"
                  placeholder="*********"
                  value={value.confirmPassword}
                  onChange={handleChange}
                  className=""
                  label="Confirmez le mot de passe"
                />
                {error.confirmPassword && <div className="text-red-500"> {error.confirmPassword} </div>}
              </div>
              <Button>Réinitialiser le mot de passe</Button>
              <div className="flex flex-col">
                <Link className="text-red-500" href="/login">
                  <span className="font-semibold underline">Se connecter</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
