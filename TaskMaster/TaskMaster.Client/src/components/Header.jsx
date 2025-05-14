import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            className="h-8 w-8 mr-2" 
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
          <h1 className="text-2xl font-bold">TaskMaster</h1>
        </div>
        
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">Projects</a>
          <a href="#" className="hover:underline">Reports</a>
        </div>
        
        <div className="flex items-center">
          <button 
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition duration-150"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;