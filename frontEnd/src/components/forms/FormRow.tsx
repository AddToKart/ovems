import React from 'react';
import type { ReactNode } from 'react';

interface FormRowProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const FormRow: React.FC<FormRowProps> = ({ 
  children, 
  columns = 1,
  gap = 'md'
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };
  
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
  };
  
  return (
    <div className={`grid ${colClasses[columns]} ${gapClasses[gap]} mb-4`}>
      {children}
    </div>
  );
};

export default FormRow; 