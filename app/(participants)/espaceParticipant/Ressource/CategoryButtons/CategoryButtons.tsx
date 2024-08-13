import React from 'react';
import { Upload, Folder, ImageIcon, FileText } from 'lucide-react';

export default function CategoryButtons() {
  return (
    <div className="flex space-x-4 mb-6">
      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
        <FileText className="mr-2"/> Fichiers
      </button>
      <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg">
        <Folder className="mr-2"/> Dossiers
      </button>
      <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg">
        <ImageIcon className="mr-2"/> Images
      </button>
      <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg">
        <Upload className="mr-2"/> Ajouter une ressource
      </button>
    </div>
  );
}
