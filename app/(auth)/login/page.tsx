"use client";
import { Button } from "@/components/form/button";
import FormInput from "@/components/form/input";
import axios from "axios";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type Value = {
  email : string,
  password : string,
  remember : boolean
}

export default function Page() {
  const [value , setValue ] = useState<Value>({
    email : '',
    password : '',
    remember : false
  })

  const [error , setError] = useState<{[key : string]: string}>({})
  console.log(error);
  
  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setValue({...value , [input.id] : input.value})
  }
  const router = useRouter()
  const handleSubmit = async (e : ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({})

    const formData = {
      email: value.email,
      password: value.password,
    };

    try {
      const res = await axios.post('http://localhost:8000/api/login', formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        console.log("success! you are connected", res.data);
        if(res.data.Utilisateur.role === "organisateur"){
          router.replace('/dashboard');
        }else{
          router.replace('/espaceParticipant');
        }
      
      }
    } catch (error) {
      setError({genrale : ' désolé , les information que vous avez ajouté sont incorrect'});
      console.log("error" , error );
    }
  }




  return (<div className="h-screen p-10">
      <Link href="/user_role" className="border flex items-center gap-2 max-w-32 py-1 rounded-md justify-center" >
          <Undo2 className="stroke-1 size-3"/> <span>Retour</span>
      </Link>
    <div className="flex justify-center items-center max-w-4xl m-auto">
        <div className=" m-auto flex flex-col gap-20 justify-center items-center py-10 px-20 rounded-md">
          <form className="w-[420px] " onSubmit={handleSubmit}>
          <h1 className="my-5 text-lg"> Connectez-vous </h1>
          {error.generale && <div className="text-red-500"> {error.generale} </div> }
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
              {error.email && <div className="text-red-500"> {error.email} </div> }
                  <FormInput
                    id="password"
                    type="password"
                    placeholder="*********"
                    value={value.password}
                    onChange={handleChange}
                    className=""
                    label="Password"
                    />

    </div>
    <Button> Se connecter </Button>
     <div className="flex flex-col">
          <div>
          vous avez déjà un compte ?
          <Link className="text-red-500" href="/register">
              <span className="font-semibold underline">S&apos;inscrire</span>
          </Link>
        </div>
        <Link className="text-red-500" href="/resetPassword">
            <span className="font-semibold underline">Mot de pass oublié</span>
        </Link>
      </div>
    </div>

  </form>
  </div>
  <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <Image src="/illustration-login.jpg" alt="" className="w-full" width={200} height={200}/>
        </div>
  </div>
  </div>
  );
}