import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="p-4 border-b w-full bg-white shadow-sm">
      <h1 className="text-2xl font-bold flex items-center">
        <span role="img" aria-label="wave" className="mr-2">👋</span>
        Bienvenue dans le Chat du Projet
      </h1>
      <p className="text-gray-600 mt-2">
        Ce Chat est dédié à tout ce qui concerne le projet. Vous pouvez y organiser des réunions, partager des documents et prendre des décisions avec votre équipe.
      </p>
      <div className="flex mt-4 space-x-4">
        <button className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange">
          Ajouter des Membres
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
          Transférer les e-mails sur ce Chat
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
