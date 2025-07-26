import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingCart, Star, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { productService } from '../services/api';
import { useCartStore } from '../stores/cartStore';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { formatPrice } from '../utils';
import { useState } from 'react';
import { useNotification } from '../hooks/useNotification';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { showNotification } = useNotification();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Producto no encontrado
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Button onClick={() => navigate('/')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    showNotification(`${quantity} "${product.title}" agregado${quantity > 1 ? 's' : ''} al carrito`, 'success');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a productos
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Imagen del producto */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              {/* Categoría */}
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {product.rating.rate} ({product.rating.count} reseñas)
                </span>
              </div>

              {/* Precio */}
              <div className="space-y-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Precio incluye impuestos
                </p>
              </div>

              {/* Descripción */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Descripción
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Selector de cantidad */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cantidad
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-gray-900 dark:text-white font-medium min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      onClick={() => setQuantity(quantity + 1)}
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {quantity} {quantity === 1 ? 'unidad' : 'unidades'}
                  </span>
                </div>
              </div>

              {/* Botón agregar al carrito */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="text-lg py-4"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar {quantity} {quantity === 1 ? 'producto' : 'productos'} al carrito
                </Button>
              </div>

              {/* Información adicional */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Información del producto
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Garantía de satisfacción de 30 días</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                    <RotateCcw className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span>Devoluciones gratuitas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
