// Constantes de la aplicación

// API
export const API_BASE_URL = 'https://fakestoreapi.com';

// Rutas
export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
} as const;

// Categorías de productos (basadas en Fake Store API)
export const PRODUCT_CATEGORIES = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
] as const;

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  PRODUCTS_PER_PAGE: 12,
} as const;

// Configuración de carrito
export const CART_CONFIG = {
  MAX_QUANTITY: 10,
  MIN_QUANTITY: 1,
  STORAGE_KEY: 'cart-storage',
} as const;

// Mensajes de error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  PRODUCT_NOT_FOUND: 'Producto no encontrado.',
  CART_EMPTY: 'Tu carrito está vacío.',
  FORM_VALIDATION: 'Por favor corrige los errores en el formulario.',
  GENERIC_ERROR: 'Ha ocurrido un error. Inténtalo de nuevo.',
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Producto agregado al carrito',
  PRODUCT_REMOVED: 'Producto eliminado del carrito',
  ORDER_PLACED: '¡Orden realizada exitosamente!',
  CART_CLEARED: 'Carrito vaciado',
} as const;

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASING: {
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
} as const;

// Colores del tema (TailwindCSS)
export const THEME_COLORS = {
  PRIMARY: 'blue-600',
  SECONDARY: 'gray-600',
  SUCCESS: 'green-600',
  WARNING: 'yellow-600',
  ERROR: 'red-600',
} as const;
