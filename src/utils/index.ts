import type { Product, ProductFilters } from '../types';

// Formatear precio d moneda
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};


export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};


export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Filtros
export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
  let filtered = [...products];


  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }


  return filtered;
};

// Generar ID unico para las ordenes
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

// Validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// funcion para busquedas
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
};

// obtener mensaje de error legible
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Ha ocurrido un error inesperado';
};

// Formatear fecha
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Formatear número de tarjeta de credito (espacios cada 4 digitos)
export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, '');
  const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
  return formatted.length > 19 ? formatted.slice(0, 19) : formatted;
};

// Formatear fecha de expiracion
export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
  }
  return cleaned;
};

// Formatear CVV 
export const formatCvv = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 3);
};

// Formatear codigo postal
export const formatPostalCode = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 5);
};

// Formatear nombres
export const formatNameField = (value: string): string => {
  return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
};

// Formatear direccion 
export const formatAddress = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]/g, '');
};
