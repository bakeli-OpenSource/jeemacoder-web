import { Bell } from "lucide-react";
import { NavLinks } from "../home/navLinks";
import { ListItem } from "../regular_list";
import Image from 'next/image';

type Links = { href: string; link: string };

const links: Links[] = [
  { href: "/espaceParticipant", link: "Accueil" },
  { href: "/espaceParticipant", link: "Espace" },
  { href: "/espaceParticipant", link: "Projet" }
];

const sideBarLink: Links[] = [
  { href: "/espaceParticipant", link: "Détails" },
  { href: "/espaceParticipant/tableau", link: "Tableaux" },
  { href: "/espaceParticipant/Ressource", link: "Ressources" },
  { href: "/espaceParticipant/Chat", link: "Chat" },
];

export const NavBar = () => {
  return (
    <div className="flex space-x-96 items-center justify-between ">
      {/* Logo / Branding */}
      <div className="flex items-center flex-shrink-0">
        <div className=" ml-10 w-16 h-16  flex items-center justify-center">
            <Image
            src="/jemacoderLogo.png"
            alt="JeMacoder Logo"
            width={96}
            height={96}
            className="w-full"
          />
        </div>
      </div>

      {/* Links */}
      <div className="flex-grow flex items-center justify-center">
        <ListItem 
          items={links}
          resourcename="links"
          component={NavLinks}
          className="flex gap-6 text-white text-sm font-semibold"
        />
      </div> 

      {/* Search & Notifications */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-50 px-3 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-gray-800 outline-none"
        />
        <Bell className="text-white text-xl cursor-pointer hover:text-blue-400 transition-colors" />
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:bg-gray-600 transition-colors">
         DC
        </div>
      </div>
    </div>
  );
};

export const SideBar = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-hidden pt-4 bg-gray-800 shadow-md">
      <ListItem 
        items={sideBarLink}
        resourcename="links"
        component={NavLinks}
        className="flex flex-col gap-4 text-white text-sm font-medium"
      />
    </div>
  );
};
