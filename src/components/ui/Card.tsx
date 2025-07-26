import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md' 
}: CardProps) {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm dark:shadow-gray-900/20';
  const hoverClasses = hover ? 'hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/30 transition-shadow duration-200' : '';
  
  const cardClasses = [
    baseClasses,
    hoverClasses,
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}
