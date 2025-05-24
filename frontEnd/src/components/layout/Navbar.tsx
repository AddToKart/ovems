import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    // Call the parent's onToggle handler if provided
    if (onToggle) {
      onToggle(newState);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/elections', icon: '🗳️', label: 'Elections' },
    { path: '/candidates', icon: '👥', label: 'Candidates' },
    { path: '/voters', icon: '📋', label: 'Voters' },
    { path: '/results', icon: '📈', label: 'Results' },
    { path: '/audit', icon: '🔍', label: 'Audit Logs' },
  ];
  
  return (
    <aside className={`bg-gray-900 text-white h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 z-30`}>
      {/* Header / Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white">OVEMS</h1>
        )}
        <button 
          onClick={toggleSidebar}
          className={`p-1 rounded-md hover:bg-gray-700 ${isCollapsed ? 'mx-auto' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7M19 19l-7-7 7-7"} />
          </svg>
        </button>
      </div>
      
      {/* User Profile Section */}
      <div className={`px-4 py-6 border-b border-gray-800 ${isCollapsed ? 'text-center' : ''}`}>
        <div className={`${isCollapsed ? 'flex justify-center' : 'flex items-center'}`}>
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 21C4 17.134 7.582 14 12 14C16.418 14 20 17.134 20 21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="ml-3 text-sm">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Bottom Section - Version or Help */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 ${isCollapsed ? 'text-center' : ''}`}>
        {!isCollapsed ? (
          <div className="text-xs text-gray-500">
            <p>OVEMS v1.0</p>
            <p className="mt-1">© 2023 Election System</p>
          </div>
        ) : (
          <div className="text-xl text-gray-500">💡</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 