"use client";
import { Button } from "@/components/form/button";
import FormInput from "@/components/form/input";
import axios from "axios";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type Value = {
  email: string;
};

export default function RequestResetPasswordPage() {
  const [value, setValue] = useState<Value>({ email: '' });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setValue({ ...value, [input.id]: input.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});
    setSuccess(null);

    try {
      const res = await axios.post('https://api.jeemacoder.fewnu.app/api/forget/email', { email: value.email }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        setSuccess('Un email de réinitialisation a été envoyé.');
      }
    } catch (error) {
      setError({ general: 'Une erreur s\'est produite lors de la demande de réinitialisation du mot de passe.' });
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
            <h1 className="my-5 text-lg">Réinitialisez votre mot de passe</h1>
            {error.general && <div className="text-red-500"> {error.general} </div>}
            {success && <div className="text-green-500"> {success} </div>}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-5">
                <FormInput
                  id="email"
                  type="email"
                  placeholder="Example@gmail.com"
                  value={value.email}
                  onChange={handleChange}
                  className=""
                  label="Email"
                />
                {error.email && <div className="text-red-500"> {error.email} </div>}
              </div>
              <Button>Envoyer</Button>
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
}
