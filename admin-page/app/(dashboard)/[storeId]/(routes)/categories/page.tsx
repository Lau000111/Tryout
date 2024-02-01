"use client"
import React, { useState, useEffect } from 'react';
import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";
import { fetchGetCatalog } from '@/app/api/products/route';

const CategoriesPage = ({ params }: { params: { storeId: string } }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
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
      } catch (error) {
        console.error('Fehler:', error);
      }
    };

    fetchDishes();
  }, [params.storeId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={categories} />
      </div>
    </div>
  );
};


export default CategoriesPage;
