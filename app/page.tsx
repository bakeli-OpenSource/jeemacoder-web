'use client'
import Hero from "@/app/components/home/hero";
import { MobileNav } from "@/app/components/home/menuHamburger";
import { NavBar } from "@/app/components/home/navBar";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState('');

  return (
    <main className="font-mono bg-gradient-radial-home h-screen">
      {/* nav bar */}
      <NavBar />
      {/* hamburger nav */}
      <div className="hidden max-md:block ">
        <MobileNav />  
      </div>
      <Hero />
    </main>
  );
}
