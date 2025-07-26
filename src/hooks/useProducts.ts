import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/api';

// Hook para obtener todos los productos o por categoría
export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => 
      category 
        ? productService.getProductsByCategory(category)
        : productService.getAllProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para obtener un producto por ID
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};

// Hook para obtener productos por categoría
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para obtener categorías
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};

