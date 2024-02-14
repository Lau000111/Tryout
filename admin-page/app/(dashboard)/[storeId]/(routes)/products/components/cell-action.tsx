"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCatalog } from '@/context/CatalogContext';


import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { ProductColumn } from "./columns";
import { useTranslation } from "react-i18next";
import { deleteDishOrItem, fetchGetCatalog } from "@/app/api/products/route";
import { Catalog } from "@/types/schema";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { removeItem } = useCatalog();
  const { t } = useTranslation();

  const [category, setcategory] = useState<Catalog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGetCatalog();

        setcategory(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);
  
  const onConfirm = async () => {
    try {
      setLoading(true);

      console.log("Data: ", data);

      let dishIndex = -1;
      let itemIndex = -1;
  
      if (!category) {
        throw new Error('No categories data available');
      }
      category.dishes.forEach((dish, index) => {
        dish.items.forEach((item, idx) => {
          if (item.id === data.id) {
            dishIndex = index;
            itemIndex = idx;
          }
        });
      });
  
      if (dishIndex === -1 || itemIndex === -1) {
        throw new Error("Item nicht gefunden.");
      }
  
      const payload = [
        {
          op: "remove",
          path: `/Dishes/${dishIndex}/Items/${itemIndex}`,
        }
      ];
      
      const result = await deleteDishOrItem(payload);

      removeItem(data.id);

      toast.success('Product deleted.');
      router.refresh();
      window.location.reload();
      router.push(`/${params.storeId}/products`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);


      const payload = [
        {
          op: "remove",
          path: `/dishes/${data.id}/Items/-`,
        }
      ];

      const result = await deleteDishOrItem(payload);

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Product ID copied to clipboard.');
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Id {t('')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> {t('menu.options.update')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> {t('menu.options.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

