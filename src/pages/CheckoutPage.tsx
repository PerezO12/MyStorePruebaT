import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Package, CheckCircle } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { 
  formatPrice,
  formatCardNumber,
  formatExpiryDate,
  formatCvv,
  formatPostalCode,
  formatNameField,
  formatAddress
} from '../utils';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderItems, setOrderItems] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = getTotalPrice();

  // Si el carrito está vacío, redirigir
  if (items.length === 0 && !orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Agrega algunos productos antes de proceder al checkout.
            </p>
            <Button onClick={() => navigate('/')} variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a la tienda
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Aplicar formateo según el tipo de campo
    switch (field) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(value);
        break;
      case 'cvv':
        formattedValue = formatCvv(value);
        break;
      case 'postalCode':
        formattedValue = formatPostalCode(value);
        break;
      case 'firstName':
      case 'lastName':
      case 'city':
        formattedValue = formatNameField(value);
        break;
      case 'address':
        formattedValue = formatAddress(value);
        break;
      default:
        formattedValue = value;
        break;
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    // Limpiar error cuando el usuario comience a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'El nombre solo puede contener letras';
    }

    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'El apellido solo puede contener letras';
    }

    // Validar dirección
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'La dirección debe tener al menos 10 caracteres';
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]+$/.test(formData.address)) {
      newErrors.address = 'La dirección contiene caracteres no válidos';
    }

    // Validar ciudad
    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'La ciudad debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.-]+$/.test(formData.city)) {
      newErrors.city = 'La ciudad solo puede contener letras, espacios, puntos y guiones';
    }

    // Validar código postal
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'El código postal es requerido';
    } else if (!/^\d{5}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = 'El código postal debe tener exactamente 5 dígitos';
    }

    // Validar número de tarjeta
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else {
      const cardNumber = formData.cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = 'El número de tarjeta debe tener exactamente 16 dígitos';
      }
    }

    // Validar fecha de vencimiento
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'La fecha de vencimiento es requerida';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Formato inválido. Use MM/YY (ej: 12/25)';
    } else {
      // Validar que la fecha no esté vencida
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Últimos 2 dígitos
      const currentMonth = currentDate.getMonth() + 1;
      const cardYear = parseInt(year, 10);
      const cardMonth = parseInt(month, 10);
      
      if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
        newErrors.expiryDate = 'La tarjeta está vencida';
      }
    }

    // Validar CVV
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (!/^\d{3}$/.test(formData.cvv.trim())) {
      newErrors.cvv = 'El CVV debe tener exactamente 3 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Capturar datos del pedido ANTES de limpiar el carrito
    const finalTotal = total;
    const finalItems = totalItems;
    
    // Generar número de orden
    const orderNum = 'ORD-' + Date.now().toString().slice(-8);
    setOrderNumber(orderNum);
    setOrderTotal(finalTotal);
    setOrderItems(finalItems);

    // Completar pedido y limpiar carrito
    setOrderCompleted(true);
    clearCart();
    setIsProcessing(false);
  };

  // Pantalla de confirmación de pedido completado
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center py-12">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Compra Finalizada!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tu compra ha sido procesada exitosamente. Recibirás un email de confirmación pronto.
            </p>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Número de pedido:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Total pagado:</span>
                    <span className="font-bold text-lg text-green-600">{formatPrice(orderTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Productos:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{orderItems} artículos</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Button onClick={() => navigate('/')} variant="primary" fullWidth>
                  Continuar comprando
                </Button>
                <Button onClick={() => navigate('/cart')} variant="outline" fullWidth>
                  Ver carrito
                </Button>
              </div>
            </div>
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
            onClick={() => navigate('/cart')} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al carrito
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información de contacto */}
              <Card padding="lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Información de contacto
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    required
                    fullWidth
                  />
                </div>
              </Card>

              {/* Dirección de envío */}
              <Card padding="lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Dirección de envío
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={errors.firstName}
                    required
                    fullWidth
                  />
                  <Input
                    label="Apellidos"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={errors.lastName}
                    required
                    fullWidth
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Dirección"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      error={errors.address}
                      required
                      fullWidth
                    />
                  </div>
                  <Input
                    label="Ciudad"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    error={errors.city}
                    required
                    fullWidth
                  />
                  <Input
                    label="Código Postal"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    error={errors.postalCode}
                    required
                    fullWidth
                  />
                </div>
              </Card>

              {/* Información de pago */}
              <Card padding="lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Información de pago
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Número de tarjeta"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    required
                    fullWidth
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Fecha de expiración"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      required
                      fullWidth
                    />
                    <Input
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      error={errors.cvv}
                      placeholder="123"
                      required
                      fullWidth
                    />
                  </div>
                </div>
              </Card>

              {/* Botón de envío */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isProcessing}
                className="text-lg py-4"
              >
                {isProcessing ? 'Procesando pago...' : `Pagar ${formatPrice(total)}`}
              </Button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card padding="lg" className="sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Resumen del pedido
              </h2>
              
              {/* Productos */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-12 h-12 object-contain bg-gray-100 dark:bg-gray-700 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">
                    Total ({totalItems} productos)
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
