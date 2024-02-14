"use client"
import React, { useEffect, useState } from 'react';
import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";
import { fetchGetCatalog } from '@/app/api/products/route';

const CategoriesPage = ({ params }: { params: { storeId: string } }) => {
  const [categories, setCategories] = useState<CategoryColumn[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGetCatalog();
          
        const categoryColumns: CategoryColumn[] = result.dishes.map((dish: { name: string }) => ({
          name: dish.name,
        }));
        setCategories(categoryColumns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    setIsLoaded(true);
  }, []);
  

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
