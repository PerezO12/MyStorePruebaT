import { useCategories } from '../hooks/useProducts';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  // Capitalizar primera letra de categoría
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={selectedCategory === '' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('')}
      >
        Todas las categorías
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category)}
        >
          {formatCategory(category)}
        </Button>
      ))}
    </div>
  );
}
