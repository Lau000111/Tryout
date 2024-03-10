import { redirect } from "next/navigation";
import React, { useEffect, useState, useRef } from 'react';

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getRestaurantById } from "@/app/api/restaurant/route";
import { fetchCatalogsByRestaurant } from "@/app/api/products/route";

const Navbar = () => {
    const [storeItems, setStoreItems] = useState<Record<string, any>[]>([]);
    const [restaurantData, setRestaurantData] = useState<Record<string, any>[]>([]);


    
    useEffect(() => {
        const storeData = localStorage.getItem('store');
        if (storeData) {
            // Trenne den String an einem bestimmten Trennzeichen und konvertiere jedes Teil in ein Objekt
            const itemsArray: Record<string, any>[] = storeData ?
                [{ key: storeData, value: storeData }] : [];

            setStoreItems(itemsArray);
        }
        else {
            redirect('/');
        }

    }, []);

    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurant = await getRestaurantById();
        const catalogs = await fetchCatalogsByRestaurant();
        console.log("restaurant: ", restaurant);
        const itemsArray: Record<string, any>[] = restaurant ?
        [{ key: restaurant.name, value: restaurant.id }] : [];

    // setStoreItems(itemsArray);
        setRestaurantData(itemsArray);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);




    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={restaurantData} />

                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

            </div>
        </div>
    );
};

export default Navbar;