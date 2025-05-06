import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../context/AuthContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <MobileMenu isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Welcome banner (only on desktop) */}
            <div className="hidden sm:block mb-6 bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm font-medium text-primary">
                Welcome back, <span className="font-semibold">{user?.name}</span>
              </p>
              <p className="text-xs text-gray-600">Unit: {user?.unit}</p>
            </div>
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;