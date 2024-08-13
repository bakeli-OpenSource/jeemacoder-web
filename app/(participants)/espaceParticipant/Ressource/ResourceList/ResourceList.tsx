import React from 'react';
import ResourceCard from '../ResourceCard/ResourceCard';


const resources = [
  { id: 1, name: "Document.pdf", type: "file", category: "Fichiers", downloadLink: "#" },
  { id: 2, name: "Photos", type: "folder", category: "Dossiers", downloadLink: "#" },
  { id: 3, name: "Image.png", type: "image", category: "Images", downloadLink: "#" },
  // Ajoute plus de ressources ici...
];

export default function ResourceList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
