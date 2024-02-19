"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { AlertModal } from "@/components/modals/alert-modal";

import { CategoryColumn } from "./columns";
import { useTranslation } from "react-i18next";
import { Catalog } from "@/types/schema";
import { deleteDishOrItem, fetchGetCatalog } from "@/app/api/products/route";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();


  const [category, setCategories] = useState<Catalog>();

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

  
  const onConfirm = async () => {
    try {
      setLoading(true);

      let dishIndex = -1;
  
      if (!category) {
        throw new Error('No categories data available');
      }
      category.dishes.forEach((dish, index) => {
          if (dish.name === data.name) {
            dishIndex = index;
          }
      });

      console.log("Data: ", dishIndex);
  
      if (dishIndex === -1) {
        throw new Error("Item nicht gefunden.");
      }

      const payload = [
        {
          op: "remove",
          path: `/dishes/${dishIndex}`,
        }
      ];
      
      const result = await deleteDishOrItem(payload);
      
      
      toast.success('Category deleted.');
      router.refresh();
      window.location.reload();
    } catch (error) {
      toast.error('Make sure you removed all products using this category first.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Category ID copied to clipboard.');
  };

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
            onClick={() => onCopy(data.name)}
          >
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/categories/${data.name}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> {t('categories.options.update')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> {t('categories.options.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
