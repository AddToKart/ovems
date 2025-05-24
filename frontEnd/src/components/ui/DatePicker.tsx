import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  label, 
  error, 
  fullWidth = false, 
  id,
  ...props 
}: DatePickerProps) => {
  
  const inputClasses = `block border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
    error ? 'border-red-300' : 'border-gray-300'
  } ${fullWidth ? 'w-full' : ''}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type="date"
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DatePicker; 