import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useCartStore } from '../stores/cartStore';
import { formatPrice, truncateText } from '../utils';
import { useNotification } from '../hooks/useNotification';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { showNotification } = useNotification();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar navegación al hacer click en el botón
    addItem(product);
    showNotification(`"${product.title}" agregado al carrito`, 'success');
  };

  return (
    <Card hover className="group flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
        {/* Imagen del producto */}
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
            {truncateText(product.title, 60)}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {truncateText(product.description, 80)}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>

          {/* Precio - empujar hacia abajo con mt-auto */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Botón agregar al carrito - siempre en la parte inferior */}
      <div className="mt-4">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleAddToCart}
          className="group-hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al carrito
        </Button>
      </div>
    </Card>
  );
}
