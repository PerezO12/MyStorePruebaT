import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Toast } from '../components/ui/Toast';
import type { ToastProps } from '../components/ui/Toast';

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id' | 'onRemove'>) => void;
  showSuccessToast: (title: string, description?: string) => void;
  showErrorToast: (title: string, description?: string) => void;
  showInfoToast: (title: string, description?: string) => void;
  showWarningToast: (title: string, description?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showToast = (toast: Omit<ToastProps, 'id' | 'onRemove'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id, onRemove: removeToast };
    setToasts(prev => [...prev, newToast]);
  };

  const showSuccessToast = (title: string, description?: string) => {
    showToast({ type: 'success', title, description });
  };

  const showErrorToast = (title: string, description?: string) => {
    showToast({ type: 'error', title, description });
  };

  const showInfoToast = (title: string, description?: string) => {
    showToast({ type: 'info', title, description });
  };

  const showWarningToast = (title: string, description?: string) => {
    showToast({ type: 'warning', title, description });
  };

  return (
    <ToastContext.Provider value={{
      showToast,
      showSuccessToast,
      showErrorToast,
      showInfoToast,
      showWarningToast
    }}>
      {children}
      
      {/* Container de Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
