import React from 'react';
import { FaCode } from "react-icons/fa";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { AiOutlinePlus, AiOutlineFontSize, AiOutlineSmile,  AiOutlineVideoCamera, AiOutlineAudio, AiOutlineEdit, AiOutlineSend } from 'react-icons/ai';

const MessageInput: React.FC = () => {
  return (
    <div className="border-t p-4  w-full flex items-center space-x-4 bg-white">
      <button className="text-gray-400 hover:text-gray-600">
        <AiOutlinePlus className="h-6 w-6" />
      </button>

      <input
        type="text"
        placeholder="Envoyer un message dans le chat"
        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />

      <div className="flex space-x-2">
        {/* Icône Aa */}
        <button className="text-gray-400 hover:text-gray-600">
          <AiOutlineFontSize className="h-6 w-6" />
        </button>

        {/* Icône Smiley */}
        <button className="text-gray-400 hover:text-gray-600">
          <AiOutlineSmile className="h-6 w-6" />
        </button>
        
        {/* Icône @ */}
        <button className="text-gray-400 hover:text-gray-600">
          <HiOutlineAtSymbol className="h-6 w-6" />
        </button>

        {/* Icône code */}
        <button className="text-gray-400 hover:text-gray-600">
          <FaCode className="h-6 w-6" />
        </button>

        {/* Icône Vidéo */}
        <button className="text-gray-400 hover:text-gray-600">
          <AiOutlineVideoCamera className="h-6 w-6" />
        </button>

        {/* Icône Microphone */}
        <button className="text-gray-400 hover:text-gray-600">
          <AiOutlineAudio className="h-6 w-6" />
        </button>

        {/* Icône Crayon */}
        <button className="text-gray-400 hover:text-gray-600">
          <AiOutlineEdit className="h-6 w-6" />
        </button>
      </div>

      <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
        <AiOutlineSend className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MessageInput;
