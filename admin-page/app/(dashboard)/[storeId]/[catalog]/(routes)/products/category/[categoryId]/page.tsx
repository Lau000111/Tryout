import React from 'react';
import { CategoryForm } from "./components/category-form";
import { Billboard } from '@/types/schema';

const CategoryPage = ({
  params
}: {
  params: { categoryId: string, storeId: string }
}) => {
  // Dummy-Daten oder Abrufen der Daten von einem anderen Ort
  const billboards: Billboard[] = []; // Ersetzen Sie dies durch tatsächliche Daten
  const category = null; // Ersetzen Sie dies durch tatsächliche Daten

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}

export default CategoryPage;
