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
  // Dummy-Produktdaten
  const product = {
    id: params.productId,
    storeId: params.storeId,
    name: "Dummy Product",
    price: 50,
    isFeatured: false,
    isArchived: false,
    sizeId: "size1",
    size: {
      id: "size1",
      storeId: params.storeId,
      name: "Medium",
      value: "M", // Angenommen, das Size-Interface enthält ein "value"-Feld
      products: [], // Angenommen, das Size-Interface enthält ein "products"-Feld
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    colorId: "color1",
    color: {
      id: "color1",
      storeId: params.storeId,
      name: "Red",
      value: "#ff0000",
      products: [], // Angenommen, das Color-Interface enthält ein "products"-Feld
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    images: [
      { id: 'img1', productId: params.productId, url: "https://example.com/product.jpg", createdAt: new Date(), updatedAt: new Date() },
      // Weitere Bilder nach Bedarf
    ],
    orderItems: [], // Leeres Array, da keine detaillierten Informationen verfügbar sind
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // ... Rest des Codes
  
  
  // ... Rest des Codes
  

  // Dummy-Kategoriendaten
  const categories = [
    {
      id: "cat1",
      storeId: params.storeId,
      name: "Kategorie 1",
      products: [], // Leeres Array oder füge Produkt-Daten hinzu, falls erforderlich
      createdAt: new Date(),
      updatedAt: new Date(),
      // ... Füge weitere Eigenschaften hinzu, falls sie im Category-Interface definiert sind
    },
    {
      id: "cat2",
      storeId: params.storeId,
      name: "Kategorie 2",
      products: [], // Leeres Array oder füge Produkt-Daten hinzu, falls erforderlich
      createdAt: new Date(),
      updatedAt: new Date(),
      // ... Füge weitere Eigenschaften hinzu, falls sie im Category-Interface definiert sind
    },
    // ... Weitere Kategorien nach Bedarf
  ];
 // Dummy-Größendaten mit allen erforderlichen Eigenschaften
const sizes = [
  {
    id: "size1",
    storeId: params.storeId,
    name: "Klein",
    value: "S", // Wert für die Größe
    products: [], // Leeres Array oder füge Produkt-Daten hinzu, falls erforderlich
    createdAt: new Date(),
    updatedAt: new Date(),
    // ... Füge weitere Eigenschaften hinzu, falls sie im Size-Interface definiert sind
  },
  {
    id: "size2",
    storeId: params.storeId,
    name: "Mittel",
    value: "M", // Wert für die Größe
    products: [], // Leeres Array oder füge Produkt-Daten hinzu, falls erforderlich
    createdAt: new Date(),
    updatedAt: new Date(),
    // ... Füge weitere Eigenschaften hinzu, falls sie im Size-Interface definiert sind
  },
  // ... Weitere Größen nach Bedarf
];

// ... Rest des Codes


// Dummy-Farbdaten mit allen erforderlichen Eigenschaften
const colors = [
  {
    id: "color1",
    storeId: params.storeId,
    name: "Rot",
    value: "#ff0000",
    products: [], // Leeres Array oder füge Produkt-Daten hinzu, falls erforderlich
    createdAt: new Date(),
    updatedAt: new Date(),
    // ... Füge weitere Eigenschaften hinzu, falls sie im Color-Interface definiert sind
  },
  {
    id: "color2",
    storeId: params.storeId,
    name: "Grün",
    value: "#00ff00",
    products: [], // Leeres Array oder füge Produkt-Daten hinzu, falls erforderlich
    createdAt: new Date(),
    updatedAt: new Date(),
    // ... Füge weitere Eigenschaften hinzu, falls sie im Color-Interface definiert sind
  },
  // ... Weitere Farben nach Bedarf
];
const [category, setCategories] = useState([]);
// ... Rest des Codes

const reloadCategories = async () => {
  try {
    const result = await fetchGetCatalog();
    const fetchedCategories = result.dishes;
    const formattedCategories = fetchedCategories.map((dish: { name: any; }, index: number) => ({
      id: (index + 1).toString(),
      name: dish.name
    }));
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
          categories={category} 
          colors={colors}
          sizes={sizes}
          initialData={{
            ...product,
            images: [] 
          }}
          itemId='id'
        />
      </div>
    </div>
  );
}

export default ProductPage;
