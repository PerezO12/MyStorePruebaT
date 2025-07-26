import { createContext } from 'react';

export interface NotificationType {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface NotificationContextType {
  notifications: NotificationType[];
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
