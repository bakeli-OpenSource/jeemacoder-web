import React from 'react';

export default function SearchBar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Ressources</h1>
      <input 
        type="text" 
        placeholder="Rechercher..."
        className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
}
