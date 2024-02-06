"use client"
import React, { useState } from 'react';
import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";
import { fetchGetCatalog } from '@/app/api/products/route';

const CategoriesPage = ({ params }: { params: { storeId: string } }) => {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchDishes = async () => {
    if (!isLoaded) {
      try {
        const result = await fetchGetCatalog();
        if (!result.ok) {
          throw new Error('Fehler beim Abrufen der Dishes');
        }
        const dishesData = await result.json();

        const updatedCategories = dishesData.map((dish: { name: any; }) => ({
          name: dish.name,
        }));

        setCategories(updatedCategories);
        setIsLoaded(true); // Setzt den Ladestatus nach dem Laden
      } catch (error) {
        console.error('Fehler:', error);
      }
    }
  };

  if (!isLoaded) fetchDishes(); // Lädt Daten beim ersten Rendern

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
