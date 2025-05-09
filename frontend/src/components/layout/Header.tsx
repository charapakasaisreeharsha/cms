import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface NotificationItem {
  id: string;
  type: 'announcement' | 'complaint';
  title: string;
  description: string;
  date: string;
  link: string;
  number?: number; // for numbering unread notifications
}

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_API_URL.replace('/auth', '');

        // Fetch recent announcements
        const announcementsRes = await axios.get(`${apiUrl}/announcements?limit=10`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('societyToken')}` },
        });

        let complaintNotifications: NotificationItem[] = [];

        // Fetch complaints only if user is admin or resident and token exists
        const token = localStorage.getItem('societyToken');
        if ((user?.role === 'admin' || user?.role === 'resident') && token) {
          const complaintsRes = await axios.get(`${apiUrl}/complaints?status=open`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const recentComplaints = complaintsRes.data.slice(0, 10);
          complaintNotifications = recentComplaints.map((c: any) => ({
            id: `complaint-${c.id}`,
            type: 'complaint',
            title: c.title,
            description: c.description,
            date: c.date || '',
            link: '/complaints',
          }));
        }

        const announcementNotifications: NotificationItem[] = announcementsRes.data.map((a: any) => ({
          id: `announcement-${a.id}`,
          type: 'announcement',
          title: a.title,
          description: a.content,
          date: a.date || '',
          link: '/announcements',
        }));

        let combinedNotifications = [...announcementNotifications, ...complaintNotifications];

        // Sort by date descending (most recent first)
        combinedNotifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Limit to 10 notifications
        combinedNotifications = combinedNotifications.slice(0, 10);

        // Assign numbering starting from 1 for unread notifications
        let number = 1;
        const numberedNotifications = combinedNotifications.map((notif) => {
          if (!readNotificationIds.has(notif.id)) {
            return { ...notif, number: number++ };
          }
          return { ...notif };
        });

        setNotifications(numberedNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();

    // Optionally, refresh notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user, readNotificationIds]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current && !notificationRef.current.contains(event.target as Node) &&
        profileRef.current && !profileRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate unread notifications count
  const unreadCount = notifications.filter(n => !readNotificationIds.has(n.id)).length;

  const handleNotificationClick = (link: string, id: string) => {
    setShowNotifications(false);
    setReadNotificationIds(prev => new Set(prev).add(id));
    navigate(link);
  };

  // Mark all notifications as read when opening the popup
  const handleToggleNotifications = () => {
    if (!showNotifications) {
      const allIds = notifications.map(n => n.id);
      setReadNotificationIds(new Set(allIds));
    }
    setShowNotifications(!showNotifications);
  };

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
        <div className="relative" ref={notificationRef}>
          <button
            className="p-1 text-gray-600 transition-colors rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={handleToggleNotifications}
            aria-haspopup="true"
            aria-expanded={showNotifications}
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 w-80 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 max-h-96 overflow-y-auto z-50">
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">
                Recent Notifications
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-gray-500">No new notifications</div>
              ) : (
                <ul>
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="cursor-pointer hover:bg-primary/10 px-4 py-3 border-b border-gray-100 last:border-0"
                      onClick={() => handleNotificationClick(notification.link, notification.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {notification.number && (
                            <span className="inline-block w-5 h-5 text-center text-white bg-primary rounded-full text-xs font-semibold">
                              {notification.number}
                            </span>
                          )}
                          <p className="font-medium text-gray-900">{notification.title}</p>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(notification.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{notification.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center p-1 space-x-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-haspopup="true"
            aria-expanded={showProfileMenu}
            aria-label="User menu"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden md:block text-sm font-medium">{user?.name}</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
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
