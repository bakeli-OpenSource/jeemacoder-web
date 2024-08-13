import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import CategoryButtons from './CategoryButtons/CategoryButtons';
import ResourceList from './ResourceList/ResourceList';


export default function RessourcesPage() {
  return (
    <div className="p-6">
    <SearchBar />
    <CategoryButtons />
    <ResourceList />
  </div>
  );
}
