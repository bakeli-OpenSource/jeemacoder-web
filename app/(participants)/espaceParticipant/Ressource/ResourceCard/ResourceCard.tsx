import React from 'react';
import { Download } from 'lucide-react';

type Resource = {
  id: number;
  name: string;
  type: string;
  category: string;
  downloadLink: string;
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700">{resource.name}</h2>
        <a href={resource.downloadLink} className="text-blue-500 hover:underline">
          <Download />
        </a>
      </div>
      <p className="text-sm text-gray-500">{resource.category}</p>
    </div>
  );
}
