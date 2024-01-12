"use client"
import React, { useEffect } from "react";
import { BillboardColumn } from "./components/columns"
import { BillboardClient } from "./components/client";
import { Billboard } from "@/types/schema";
import { Store } from "@/types/schema";
import { Category } from "@/types/schema";
import { Size } from "@/types/schema";
import { Color } from "@/types/schema";
import { Product } from "@/types/schema";
import { Order } from "@/types/schema"

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
 
  const testSize: Size = {
    id: 'size123',
    storeId: 'store123',
    name: 'Mittel',
    value: 'M',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const testColor: Color = {
    id: 'color123',
    storeId: 'store123',
    name: 'Rot',
    value: '#FF0000',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const testProduct: Product = {
    id: 'product123',
    storeId: 'store123',
    name: 'Super Gadget',
    price: 99.99,
    isFeatured: false,
    isArchived: false,
    sizeId: 'size123', // Stelle sicher, dass dies einer gültigen Size-ID entspricht
    size: testSize, // Füge ein gültiges Size-Objekt hinzu
    colorId: 'color123', // Stelle sicher, dass dies einer gültigen Color-ID entspricht
    color: testColor, // Füge ein gültiges Color-Objekt hinzu
    images: [], // Hier können Image-Objekte hinzugefügt werden
    orderItems: [], // Hier können OrderItem-Objekte hinzugefügt werden
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const testOrder: Order = {
    id: 'order123',
    storeId: 'store123',
    orderItems: [],
    isPaid: true,
    phone: '1234567890',
    address: 'Musterstraße 1, 12345 Musterstadt',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Testdaten für Store
  const testStore: Store = {
    id: 'store123',
    name: 'TechStore',
    userId: 'user123',
    billboards: [], // Wird später hinzugefügt
    categories: [], // Wird später hinzugefügt
    products: [testProduct],
    sizes: [testSize],
    colors: [testColor],
    orders: [testOrder],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Testdaten für Category
  const testCategory: Category = {
    id: 'category123',
    storeId: 'store123',
    name: 'Elektronik',
    products: [], // Hier könnten gültige Product-Objekte hinzugefügt werden
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Testdaten für Billboard
  const testBillboards: Billboard[] = [ {
    id: 'billboard123',
    storeId: testStore.id,
    store: testStore,
    label: 'Super Sale für Elektronik!',
    imageUrl: 'https://example.com/billboard.jpg',
    categories: [testCategory],
    createdAt: new Date(),
    updatedAt: new Date(),
  }];

  const [store, setStore] = React.useState<any>();
  
  useEffect(() => {
      const store = localStorage.getItem('store');
      setStore(store);
    });

  const formattedBillboards: BillboardColumn[] = testBillboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: item.createdAt.toLocaleString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
