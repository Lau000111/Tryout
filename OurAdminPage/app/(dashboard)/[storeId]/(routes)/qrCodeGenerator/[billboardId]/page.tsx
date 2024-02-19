"use client"
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BillboardForm } from "./components/billboard-form";
import { Billboard } from "@/types/schema"
import { Store } from "@/types/schema";

const BillboardPage = () => {
  const [billboardId, setBillboardId] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('billboardId');
    if (!id) {
      id = uuidv4(); // Erzeugt eine neue GUID
      localStorage.setItem('billboardId', id);
    }
    setBillboardId(id);
  }, []);

  const [store, setStore] = React.useState<any>();
  
  useEffect(() => {
      const store = localStorage.getItem('store');
      setStore(store);
    });

  const initialDataStore: Store = {
    id: store, // oder eine andere relevante ID
    name: '', // Standardwert oder dynamischer Wert
    userId: '', // Standardwert oder dynamischer Wert
    billboards: [], // Leeres Array oder dynamischer Wert
    categories: [], // Leeres Array oder dynamischer Wert
    products: [], // Leeres Array oder dynamischer Wert
    sizes: [], // Leeres Array oder dynamischer Wert
    colors: [], // Leeres Array oder dynamischer Wert
    orders: [], // Leeres Array oder dynamischer Wert
    createdAt: new Date(), // Aktuelles Datum oder dynamischer Wert
    updatedAt: new Date(), // Aktuelles Datum oder dynamischer Wert
    // Ergänze weitere Eigenschaften, falls notwendig
  };

  
  const initialData: Billboard = {
    id: billboardId,
    storeId: '', 
    store: initialDataStore,
    label: '',
    imageUrl: '',
    categories: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={initialData} />
      </div>
    </div>
  );
}

export default BillboardPage;
