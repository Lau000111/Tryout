"use client"
import { Catalog, Dish } from '@/types/schema';
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface CatalogContextType {
  catalog: Catalog;
  addDishes: (newDishes: Dish[]) => void;
  removeItem: (dishId: string) => void;
  setCatalogData: (newCatalog: Catalog) => void
}
const initialCatalog: Catalog = {
    id: '',
    name: '',
    isActive: false,
    dishes: [],
    _rid: '',
    _self: '',
    _etag: '',
    _attachments: '',
    _ts: 0,
  };

  
export const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [catalog, setCatalog] = useState<Catalog>(initialCatalog);


  const addDishes = (newDishes: Dish[]) => {
    setCatalog(prevCatalog => ({
      ...prevCatalog,
      Dishes: [...prevCatalog.dishes, ...newDishes]
    }));
  };

  const removeItem = (itemId: string) => {
    setCatalog(currentCatalog => {
      const updatedDishes = currentCatalog.dishes.map(dish => {
        // Filtere nur die Items, die nicht die spezifizierte ID haben
        const filteredItems = dish.items.filter(item => item.id !== itemId);
        return {
          ...dish,
          Items: filteredItems
        };
      });

      return { ...currentCatalog, Dishes: updatedDishes };
    });
  };

  const setCatalogData = (newCatalog: Catalog) => {
    setCatalog(newCatalog);
  };

  // useEffect(() => {
  //   axios.get('${process.env.NEXT_PUBLIC_APP_PROJECTALPHA_CATALOG_API}/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d')
  //     .then(response => {
  //       const fetchedDishes = response.data.dishes.map((dish: { items: any[]; }) => ({
  //           ...dish,
  //           Items: dish.items.map(item => ({
  //             ...item,
  //             isFeatured: false, 
  //           }))
  //         }));
  //         setCatalog({ ...initialCatalog, Dishes: fetchedDishes });

  //     })
  //     .catch(error => {
  //       console.error('Fehler beim Abrufen des Katalogs:', error);
  //     });
  // }, []);

  return (
    <CatalogContext.Provider value={{ catalog, addDishes, removeItem, setCatalogData }}>
      {children}
    </CatalogContext.Provider>
  );
};


export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
