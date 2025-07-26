import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatPrice } from '../utils';

export function CartPage() {
  const navigate = useNavigate();
  const { 
    items, 
    itemCount, 
    updateQuantity, 
    removeItem, 
    clearCart,
    getTotalPrice 
  } = useCartStore();

  const total = getTotalPrice();

  // Si el carrito está vacío
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Parece que aún no has agregado ningún producto a tu carrito. 
              ¡Explora nuestra tienda y encuentra algo increíble!
            </p>
            <Button onClick={() => navigate('/')} variant="primary" size="lg">
              Continuar comprando
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar comprando
          </Button>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Carrito de Compras ({itemCount} productos)
            </h1>
            <Button 
              onClick={clearCart} 
              variant="outline" 
              size="sm"
              className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vaciar carrito
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} padding="lg">
                <div className="flex items-center space-x-4">
                  {/* Imagen del producto */}
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                      {item.product.description}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <Button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-3 py-1 text-gray-900 dark:text-white font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Subtotal del producto */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    {/* Botón eliminar */}
                    <Button
                      onClick={() => removeItem(item.product.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card padding="lg" className="sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Resumen del pedido
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Subtotal ({itemCount} productos)
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(total)}
                  </span>
                </div>
                
                <hr className="border-gray-200 dark:border-gray-700" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => navigate('/checkout')}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Finalizar compra ({formatPrice(total)})
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="lg"
                  fullWidth
                >
                  Continuar comprando
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
