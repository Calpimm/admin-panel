import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const DocNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const gmt3Time = new Date(date.getTime() + (3 * 60 * 60 * 1000));
      const hours = String(gmt3Time.getUTCHours()).padStart(2, '0');
      const minutes = String(gmt3Time.getUTCMinutes()).padStart(2, '0');
      const seconds = String(gmt3Time.getUTCSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-gray-800 text-gray-200 shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={handleMenuToggle}
            >
              {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-bold ml-2">API Documentation</h1>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400">{currentTime}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DocNavbar;
