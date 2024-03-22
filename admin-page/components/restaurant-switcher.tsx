"use client"

import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown, MinusCircle, PlusCircle, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useParams, useRouter } from "next/navigation"
import { useRestaurantModal } from "@/hooks/use-restaurant-modal"
import { deleteCatalog } from "@/app/api/products/route"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface RestaurantSwitcherProps extends PopoverTriggerProps {
    items: Record<string, any>[];
}

export default function StoreSwitcher({ className, items = [] }: RestaurantSwitcherProps) {
    const storeModal = useRestaurantModal();
    const params = useParams();
    const router = useRouter();
    const [storeItems, setStoreItems] = useState(items);
    
    useEffect(() => {
        setStoreItems(items); 
    }, [items]);

    const onStoreDelete = async (storeId: string) => {
        await deleteCatalog(storeId); // Löschen des Katalogs
        const updatedItems = storeItems.filter(item => item.value !== storeId);
        setStoreItems(updatedItems);
    };

   
    
    const formattedItems = storeItems.map((item) => ({
        label: item.key,
        value: item.value
    }));
    
    const currentStore = formattedItems.find((item) => item.label === params.catalog);

    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false);
        router.push(`/${params.storeId}/${store.label}`);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <Store className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                     key={store.value}
                                     onSelect={() => onStoreSelect(store)}
                                     className="text-sm flex justify-between items-center"
                               >
                                    <div className="flex items-center">
                                        <Store className="mr-2 h-4 w-4" />
                                        {store.label}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentStore?.value === store.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </div>
                                    <MinusCircle
                                        className="ml-4 h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            onStoreDelete(store.value);
                                        }}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Catalog
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};