import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © {currentYear} Online Voting and Election Management System
          </div>
          <div className="text-sm text-gray-500 mt-2 sm:mt-0">
            <span>Version 1.0.0</span>
            <span className="mx-2 text-gray-300">|</span>
            <span>Powered by OVEMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 