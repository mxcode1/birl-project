// src/app/components/SearchBar.tsx
import React from 'react';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function SearchBar({ searchTerm, setSearchTerm }: Props) {
  return (
    <input
      type="text"
      placeholder="Search by name, ID, or description..."
      className="w-full p-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 mb-8"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}