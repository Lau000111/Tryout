"use client"
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState  } from 'react';
import { useCatalog,  } from '@/context/CatalogContext';
import axios from 'axios';
import { Dish, Item } from '@/types/schema';
import { getRestaurantById } from '../api/restaurant/route';

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChecking, setIsChecking] = useState(false);
  const { setCatalogData, catalog } = useCatalog();


  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_PROJECTALPHA_CATALOG_API}/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d`);
 
        const fetchedDishes = response.data.dishes.map((dish: { name: any; items: any[]; }) => ({
          Name: dish.name,
          Items: dish.items.map(item => ({
            Id: item.id,
            Description: item.description,
            Image: item.image,
            Name: item.name,
            Price: item.price
          }))
        }));
        setCatalogData(fetchedDishes);
      } catch (error) {
        console.error('Fehler:', error);
      }
    };

    fetchDishes();
  }, []);

  console.log("REs: ",catalog);
  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // const store = await prismadb.store.findFirst({
  //   where: {
  //     userId,
  //   }
  // });

  // if (store) {
  //   redirect(`/${store.id}`);
  // };

  useEffect(() => {
    const store = localStorage.getItem('store');
   
    if (store) {
      redirect(`/${store}`);
    } else {
      
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurant = await getRestaurantById();
        if (restaurant) {
          redirect(`/${restaurant.id}`);
        } else {
          
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  if (isChecking) {
    return <div>Lade...</div>; // oder irgendein Lade-Indikator
  }
 

  return (
    <>
      {children}
    </>
  );
};