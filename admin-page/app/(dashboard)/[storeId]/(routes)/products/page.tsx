
"use client"
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { Dish, Item } from '@/types/schema';
import { useCatalog } from '@/context/CatalogContext';

const ProductsPage =  ({
  params
}: {
  params: { storeId: string }
}) => {

  const [products, setProducts] = useState<ProductColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const { catalog, addDishes, removeItem } = useCatalog();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5235/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d`);
        
        const fetchedProducts = response.data.dishes.flatMap((dish: { name: string; items: any[]; }) => dish.items.map(item => ({
          id: item.id,
          name: item.name,
          isFeatured: false,
          description: item.description,
          price: item.price,
          category: dish.name,
        })));

        setProducts(fetchedProducts);

      } catch (error) {
        console.error('Fehler beim Laden der Produkte:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [params.storeId]);

  const transformDishesToProductColumns = (dishes: any[]) => {
    return dishes.flatMap(dish => 
      dish.items.map((item: {
        description: any; id: any; name: any; price: number | bigint; isFeatured: any; 
}) => ({
        id: item.id,
        name: item.name,
        price: formatter.format(item.price),
        category: dish.name,
        createdAt: format(new Date(), 'MMMM do, yyyy'),
        isFeatured: item.isFeatured || false,
        isArchived: false,
        description: item.description,
      }))
    );
  };

  const [transformedProducts, setTransformedProducts] = useState<ProductColumn[]>([]);

  useEffect(() => {
    const newTransformedProducts = transformDishesToProductColumns(catalog.Dishes);
    setTransformedProducts(newTransformedProducts);
  }, [catalog]);
  
  
 
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={transformedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
