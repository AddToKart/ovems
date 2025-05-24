import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  label: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  error, 
  id,
  ...props 
}: CheckboxProps) => {
  
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
        </label>
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox; 