import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import ActionTile from '../components/common/ActionTile';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  AlertCircle,
  Bell,
  CreditCard,
  Car,
  Calendar,
  Home,
  Sparkles
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Recent notifications
  const notifications = [
    {
      id: 1,
      title: 'Community Meeting',
      description: 'Monthly community meeting this Sunday at 10:00 AM.',
      date: 'Today',
      type: 'event'
    },
    {
      id: 2,
      title: 'Maintenance Notice',
      description: 'Water supply will be interrupted tomorrow from 10:00 AM to 2:00 PM due to maintenance.',
      date: 'Yesterday',
      type: 'maintenance'
    },
    {
      id: 3,
      title: 'New Payment',
      description: 'Your maintenance payment for August has been received.',
      date: '3 days ago',
      type: 'payment'
    }
  ];

  // Quick stats
  const stats = [
    {
      label: 'Pending Bills',
      value: '2',
      icon: CreditCard,
      color: 'text-red-500'
    },
    {
      label: 'Upcoming Visitors',
      value: '3',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      label: 'Open Complaints',
      value: '1',
      icon: AlertCircle,
      color: 'text-amber-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner for mobile */}
      <div className="block sm:hidden mb-6 bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
        <p className="text-sm font-medium text-primary">
          Welcome back, <span className="font-semibold">{user?.name}</span>
        </p>
        <p className="text-xs text-gray-600">Unit: {user?.unit}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center">
            <div className={`p-3 rounded-full bg-gray-100 mr-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-medium text-gray-800">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <ActionTile
          icon={Users}
          title="Register Visitor"
          description="Pre-register guests for easy access"
          to="/visitors"
          color="bg-blue-500 text-white"
        />
        <ActionTile
          icon={AlertCircle}
          title="Lodge Complaint"
          description="Report issues that need attention"
          to="/complaints"
          color="bg-amber-500 text-white"
        />
        <ActionTile
          icon={CreditCard}
          title="View Bills"
          description="Check and pay pending bills"
          to="/billing"
          color="bg-emerald-500 text-white"
        />
        <ActionTile
          icon={Car}
          title="Manage Vehicles"
          description="Register or view your vehicles"
          to="/vehicles"
          color="bg-indigo-500 text-white"
        />
      </div>

      {/* Notifications */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Recent Notifications</h2>
        <Link to="/announcements" className="text-sm text-primary hover:underline">View all</Link>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="flex">
            <div className="flex-shrink-0 mr-4">
              {notification.type === 'event' && (
                <Calendar className="w-6 h-6 text-blue-500" />
              )}
              {notification.type === 'maintenance' && (
                <Sparkles className="w-6 h-6 text-amber-500" />
              )}
              {notification.type === 'payment' && (
                <CreditCard className="w-6 h-6 text-green-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{notification.title}</h3>
                <span className="text-xs text-gray-500">{notification.date}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;