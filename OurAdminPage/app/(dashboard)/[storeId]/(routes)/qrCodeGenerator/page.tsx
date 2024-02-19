"use client"
import React, { useEffect, useState } from "react";
import { BillboardColumn } from "./components/columns"
import { BillboardClient } from "./components/client";
import { Billboard, Catalog, Restaurant } from "@/types/schema";
import { Store } from "@/types/schema";
import { Category } from "@/types/schema";
import { Size } from "@/types/schema";
import { Color } from "@/types/schema";
import { Product } from "@/types/schema";
import { Order } from "@/types/schema"
import { getRestaurantById } from "@/app/api/restaurant/route";

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRestaurantById();

        setRestaurants(result ? [result] : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={restaurants} />
      </div>
    </div>
  );
};



export default BillboardsPage;
