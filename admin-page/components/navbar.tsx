import { redirect } from "next/navigation";
import React, { useEffect, useState, useRef } from 'react';

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
    const [storeItems, setStoreItems] = useState<Record<string, any>[]>([]);

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




    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={storeItems} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};

export default Navbar;