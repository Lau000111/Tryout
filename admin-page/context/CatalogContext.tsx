"use client"
import { Catalog, Dish } from '@/types/schema';
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface CatalogContextType {
  catalog: Catalog;
  addDishes: (newDishes: Dish[]) => void;
  removeItem: (dishId: string) => void;
}
const initialCatalog: Catalog = {
    Id: '', // oder einen passenden Anfangswert setzen
    id: '', // oder einen passenden Anfangswert setzen
    Dishes: [],
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
    setCatalog({ ...catalog, Dishes: [...catalog.Dishes, ...newDishes] });
  };

  const removeItem = (itemId: string) => {
    setCatalog(currentCatalog => {
      const updatedDishes = currentCatalog.Dishes.map(dish => {
        // Filtere nur die Items, die nicht die spezifizierte ID haben
        const filteredItems = dish.Items.filter(item => item.Id !== itemId);
        return {
          ...dish,
          Items: filteredItems
        };
      });
  
      return { ...currentCatalog, Dishes: updatedDishes };
    });
  };
  


  useEffect(() => {
    axios.get('http://localhost:5235/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d')
      .then(response => {
        const fetchedDishes = response.data.dishes.map((dish: { items: any[]; }) => ({
            ...dish,
            Items: dish.items.map(item => ({
              ...item,
              isFeatured: false, 
            }))
          }));
          setCatalog({ ...initialCatalog, Dishes: fetchedDishes });
          
      })
      .catch(error => {
        console.error('Fehler beim Abrufen des Katalogs:', error);
      });
  }, []);
  return (
    <CatalogContext.Provider value={{ catalog, addDishes, removeItem }}>
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
