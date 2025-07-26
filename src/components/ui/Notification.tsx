import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Notification({ message, type = 'success', duration = 3000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 100);

    // Auto-close después del duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Esperar a que termine la animación
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
      case 'info':
        return <Check className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  const renderMessage = () => {
    // Buscar texto entre comillas y resaltarlo
    const quotedTextRegex = /"([^"]+)"/g;
    const parts = message.split(quotedTextRegex);
    
    return parts.map((part, index) => {
      // Si el índice es impar, es texto que estaba entre comillas
      if (index % 2 === 1) {
        return (
          <span key={index} className="font-bold bg-white/20 px-1 rounded">
            "{part}"
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out max-w-sm
        ${getStyles()}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      {getIcon()}
      <span className="font-medium text-sm">{renderMessage()}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
