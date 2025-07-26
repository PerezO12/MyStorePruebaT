// Tipos principales de la app
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

// Tipos para API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Tipos para errores
export interface ApiError {
  message: string;
  status?: number;
}

// Tipos para filtros
export interface ProductFilters {
  category?: string;
  search?: string;

}

// formularios
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit' | 'debit' | 'paypal';
  terms: boolean;
}
