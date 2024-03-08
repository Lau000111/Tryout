"use client";
import React, { useState, useEffect } from 'react';
import { Edit, Plus, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";
import { Catalog } from "@/types/schema";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Console } from "console";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import axios from 'axios';
import { deleteDishOrItem, fetchGetCatalog } from '@/app/api/products/route';
import { AlertModal } from '@/components/modals/alert-modal';

interface ProductsClientProps {
  data: ProductColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();
  const [aktiveKategorie, setAktiveKategorie] = useState('All');
  const [gefilterteDaten, setGefilterteDaten] = useState(data);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategories] = useState<Catalog>();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  const kategorien = ['All', ...(new Set(data.map(item => item.category)) as any)];
  console.log(data);

  useEffect(() => {
    const gefilterteDaten = data.filter(item => {
      // Überprüfe, ob alle relevanten Eigenschaften außer `category` vorhanden sind
      return item.id != null && item.name != null && item.price != null && item.description != null;
    });


    if (aktiveKategorie === 'All') {
      setGefilterteDaten(gefilterteDaten);
    } else {
      const gefiltert = gefilterteDaten.filter(item => item.category === aktiveKategorie);
      setGefilterteDaten(gefiltert);
    }
  }, [aktiveKategorie, data]);

  const handleKategorieClick = (kategorie: string) => {
    setAktiveKategorie(kategorie);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGetCatalog();

        setCategories(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const onDeleteCategory = async () => {
    if (!selectedCategoryName) {
      toast.error("Keine Kategorie ausgewählt.");
      return;
    }
  
    try {
      setLoading(true);

      let dishIndex = category?.dishes.findIndex(dish => dish.name === selectedCategoryName);

      if (dishIndex === -1) {
        throw new Error("Kategorie nicht gefunden.");
      }

      // Pfad-Update, um den Index direkt in der API-Anfrage zu verwenden
      const payload = [
        {
          op: "remove",
          path: `/dishes/${dishIndex}`,
        }
      ];
  
      await deleteDishOrItem(payload);
      
      toast.success('Kategorie gelöscht.');
      setSelectedCategoryName(null); 
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Stelle sicher, dass alle Produkte dieser Kategorie zuerst entfernt wurden.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };




  return (
    <>
     <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onDeleteCategory}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} description="Manage products for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/products/json`)}>
          <Plus className="mr-2 h-4 w-4" /> Speisekarte einfügen
        </Button>
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Produkt hinzufügen
        </Button>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Heading title={`Kategorien`} description="Füge und filtere nach Kategorien" />


          <div className="relative">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleKategorieClick('All');
                    }}
                    isActive={aktiveKategorie === 'All'}
                  >
                    All
                  </PaginationLink>
                </PaginationItem>
                <Separator orientation='vertical' className='h-10 ml-2' />
                {kategorien.slice(1).map((kategorie) => (
                  <div key={kategorie} className="relative inline-block"> 
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleKategorieClick(kategorie);
                        }}
                        isActive={aktiveKategorie === kategorie}
                      >
                        {kategorie}
                      </PaginationLink>
                    </PaginationItem>
                    <div className="absolute right-1 -top-2"> 
                      <DropdownMenu>
                        <DropdownMenuTrigger >
                          <Button className="text-xs p-1 bg-transparent hover:bg-gray-600 text-white flex items-center justify-center">
                            <ChevronDown size={16} /> 
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Optionen für {kategorie}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem ><Edit className="mr-2 h-4 w-4" />Bearbeiten</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setSelectedCategoryName(kategorie); setOpen(true); }}
                          
                           >
                            <Trash className="mr-2 h-4 w-4" />Löschen</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </PaginationContent>
            </Pagination>

          </div>
        </div>

        <div className="flex ml-auto">
          <Button onClick={() => router.push(`/${params.storeId}/${params.catalog}/products/category/new`)}>
            <Plus className="mr-2 h-4 w-4" /> Kategorie hinzufügen
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={gefilterteDaten} />
    </>
  );
};
