import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import type { NotificationType } from '../contexts/NotificationContext';
import { Notification } from '../components/ui/Notification';

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: NotificationType = { id, message, type };
    
    setNotifications(prev => [...prev, newNotification]);
    

    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
      {children}
      

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
