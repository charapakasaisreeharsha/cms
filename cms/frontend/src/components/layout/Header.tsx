import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState(3);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center">
        <button
          type="button"
          className="p-2 text-gray-500 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="w-6 h-6" />
        </button>
        <div className="ml-2 md:ml-0">
          <h1 className="text-lg font-semibold text-primary">Smart Society</h1>
          <p className="hidden text-xs text-gray-500 md:block">Making community living smarter</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification bell */}
        <div className="relative">
          <button className="p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 focus:outline-none">
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            className="flex items-center p-1 space-x-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden md:block text-sm font-medium">{user?.name}</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;