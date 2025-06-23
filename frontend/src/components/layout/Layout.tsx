 import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SecuritySidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../context/AuthContext';

const SecurityLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <SecuritySidebar />
      </div>

      {/* Mobile sidebar */}
      <MobileMenu isOpen={sidebarOpen} setIsOpen={setSidebarOpen} role="security" />

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Welcome banner (desktop only) */}
            <div className="hidden sm:block mb-6 bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-sm font-medium text-green-800">
                Welcome back, <span className="font-semibold">{user?.name}</span>
              </p>
              <p className="text-xs text-gray-600">Logged in as Security</p>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecurityLayout;
