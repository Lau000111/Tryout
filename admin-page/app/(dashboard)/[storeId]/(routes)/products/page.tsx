
"use client"
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { Catalog, Dish, Item } from '@/types/schema';
import { useCatalog } from '@/context/CatalogContext';
import { fetchGetCatalog } from '@/app/api/products/route';


const ProductsPage = ({
  params
}: {
  params: { storeId: string }
}) => {

  const [products, setProducts] = useState<ProductColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const { catalog, addDishes, removeItem } = useCatalog();
  const [data, setData] = useState<Catalog | null>(null);
  const [transformedProducts, setTransformedProducts] = useState<ProductColumn[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGetCatalog();
       
        const newTransformedProducts = transformDishesToProductColumns(result!.dishes);
        console.log("RExs: ",newTransformedProducts);
        setTransformedProducts(newTransformedProducts);

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);


  const transformDishesToProductColumns = (dishes: any[]) => {
    return dishes.flatMap(dish =>
      dish.items.map((item: {
        description: any; id: any; name: any; price: number | bigint; isFeatured: any;
      }) => ({
        id: item.id,
        name: item.name,
        price: formatter.format(item.price),
        category: dish.name,
        isFeatured: item.isFeatured || false,
        isArchived: false,
        description: item.description,
      }))
    );
  };


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={transformedProducts} />
      </div>
    </div>
  );
};


export default ProductsPage;
