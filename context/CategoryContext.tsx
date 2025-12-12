"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Category } from "@/app/admin/products/types";
import { getAllCategories } from "@/lib/category/actions";

// Tipado para el contexto
interface CategoriesContextType {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

//1. Crear el contexto
const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

//2. Crear el proveedor
const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // funcion para obtener datos del servidor
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();

      if (!res.ok) {
        toast.error(res.message);
        console.error("Error:", res.message);
        return;
      }

      const resData = res.data ?? [];

      setCategories(resData);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };

  // Efectos
  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
    };

    fetchData();
  }, []);

  console.log(categories);

  return (
    <>
      <Toaster />
      <CategoriesContext.Provider value={{ categories, fetchCategories }}>
        {children}
      </CategoriesContext.Provider>
    </>
  );
};

// Custom hook para usar el contexto facilmente
const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategories debe usarse dentro de un CategoriesProvider"
    );
  }
  return context;
};

export { CategoriesContext, CategoriesProvider, useCategories };
