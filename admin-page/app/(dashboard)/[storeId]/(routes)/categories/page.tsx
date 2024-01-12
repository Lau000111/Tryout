"use client"
import React, { useState, useEffect } from 'react';
import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";

const CategoriesPage = ({ params }: { params: { storeId: string } }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`http://localhost:5235/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d/dishes`);
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Dishes');
        }
        const dishesData = await response.json();

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
