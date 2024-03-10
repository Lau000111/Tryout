import { redirect } from "next/navigation";
import React, { useEffect, useState, useRef } from 'react';

import RestaurantSwitcher from "@/components/restaurant-switcher";
import { fetchCatalogsByRestaurant } from "@/app/api/products/route";
import { Catalog, Item } from "@/types/schema";
import { CatalogNav } from "./catalog-nav";
import { Checkbox } from "@/components/ui/checkbox"


const Navbar = () => {
  const [storeItems, setStoreItems] = useState<Record<string, any>[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCatalogsByRestaurant();
        const itemsWithCatalogId = addCatalogIdToEachItem(result);
        console.log("dess: ", itemsWithCatalogId);
        setStoreItems(itemsWithCatalogId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addCatalogIdToEachItem = (catalogs: Catalog[]) => {
    return catalogs.map(catalog => ({
      key: catalog.name,
      value: catalog.id 
    }));
  };


  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <RestaurantSwitcher items={storeItems} />

        <CatalogNav className="mx-6" />

        <div className="ml-auto flex items-center space-x-4">
          <Checkbox id="terms" /> 
          <label
             htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Active
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;