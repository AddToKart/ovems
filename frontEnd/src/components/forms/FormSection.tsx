import React from 'react';
import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  icon?: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  description, 
  children,
  collapsible = false,
  defaultOpen = true,
  icon
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-6 border border-gray-100">
      <div 
        className={`px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3 text-gray-500">{icon}</span>}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
        </div>
        {collapsible && (
          <div className="flex items-center">
            <button 
              type="button" 
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <svg 
                className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {(!collapsible || isOpen) && (
        <div className="px-6 py-5">
          {children}
        </div>
      )}
    </div>
  );
};

export default FormSection; 