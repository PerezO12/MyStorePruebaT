import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/ProductGrid';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useSearch } from '../hooks/useCommon';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useSearch();
  
  const { 
    data: products = [], 
    isLoading, 
    error 
  } = useProducts(selectedCategory);

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error al cargar productos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            No se pudieron cargar los productos. Inténtalo de nuevo más tarde.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              My Store
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre productos increíbles al mejor precio
          </p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="mb-8 space-y-6">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar productos..."
          />
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base">
            {debouncedSearchTerm && (
              <span>Resultados para "<span className="font-medium text-primary-600 dark:text-secondary-400">{debouncedSearchTerm}</span>": </span>
            )}
            <span className="font-medium">{filteredProducts.length}</span> productos encontrados
            {selectedCategory && (
              <span> en "<span className="font-medium text-secondary-600 dark:text-secondary-400">{selectedCategory}</span>"</span>
            )}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12 lg:py-20">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 dark:text-gray-300 mt-4">Cargando productos...</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <ProductGrid products={filteredProducts} />
        )}

        {/* No results */}
        {!isLoading && filteredProducts.length === 0 && !error && (
          <div className="text-center py-12 lg:py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intenta con otros términos de búsqueda o selecciona una categoría diferente.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
