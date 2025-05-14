import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActiveRoute = (path) => {
    return location.pathname === path || 
           (location.pathname === '/' && path === '/dashboard');
  };
  
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            className="h-8 w-8 mr-2 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M9 16l2 2 4-4"></path>
          </svg>
          <Link to="/" className="text-2xl font-bold text-white hover:text-white">TaskMaster</Link>
        </div>
        
        <div className="hidden md:flex space-x-4">
          <Link 
            to="/dashboard" 
            className={`text-white hover:text-white hover:underline px-2 py-1 rounded ${isActiveRoute('/dashboard') ? 'bg-blue-700' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/projects" 
            className={`text-white hover:text-white hover:underline px-2 py-1 rounded ${isActiveRoute('/projects') ? 'bg-blue-700' : ''}`}
          >
            Projects
          </Link>
          <Link 
            to="/reports" 
            className={`text-white hover:text-white hover:underline px-2 py-1 rounded ${isActiveRoute('/reports') ? 'bg-blue-700' : ''}`}
          >
            Reports
          </Link>
        </div>
        
        <div className="flex items-center">
          <button 
            className="bg-white text-blue-800 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition duration-150"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;