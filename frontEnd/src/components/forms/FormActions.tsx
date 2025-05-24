import React from 'react';
import type { ReactNode } from 'react';

interface FormActionsProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  sticky?: boolean;
  withSeparator?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  children, 
  align = 'right',
  sticky = false,
  withSeparator = true
}) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };
  
  const stickyClasses = sticky 
    ? 'sticky bottom-0 bg-white shadow-md z-10 py-4 px-6 -mx-6 -mb-5 rounded-b-lg' 
    : '';
  
  return (
    <div className={`flex items-center ${alignClasses[align]} ${stickyClasses} ${withSeparator ? 'mt-8 pt-5 border-t border-gray-200' : 'mt-6'}`}>
      {children}
    </div>
  );
};

export default FormActions; 