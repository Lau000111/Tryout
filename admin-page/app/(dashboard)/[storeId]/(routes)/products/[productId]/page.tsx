"use client"
import React, { useEffect, useState } from 'react';
import { ProductForm } from "./components/product-form";
import axios from "axios"
import { fetchGetCatalog } from '@/app/api/products/route';

const ProductPage = ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

const [category, setCategories] = useState([]);

const reloadCategories = async () => {
  try {
    const result = await fetchGetCatalog();
    const fetchedCategories = result.dishes;
    const formattedCategories = fetchedCategories.map((dish: { name: any; }, index: number) => ({
      id: (index + 1).toString(),
      name: dish.name
    }));

    console.log('Kategorien geladen:', formattedCategories);
    setCategories(formattedCategories);
  } catch (error) {
    console.error('Fehler beim Laden der Kategorien:', error);
  }
};


useEffect(() => {
  reloadCategories();
}, [params.storeId]); 
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          initialData={category}
          itemId='id'
        />
      </div>
    </div>
  );
}

export default ProductPage;
