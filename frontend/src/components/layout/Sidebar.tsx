 import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  AlertCircle,
  Bell,
  CreditCard,
  Car,
  Shield,
  BarChart,
  Calendar,
  Box,
  Camera
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role;

  const isAdmin = role === 'admin';
  const isResident = role === 'resident';
  const isSecurity = role === 'security';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 rounded-md transition-all text-sm ${
      isActive
        ? 'bg-green-100 text-green-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="h-full w-full bg-white border-r border-gray-200 p-4 space-y-4">
      <div className="px-2">
        <h1 className="text-2xl font-bold text-green-700">Smart Society</h1>
        <p className="text-xs text-gray-500">Making community living smarter</p>
      </div>

      {/* Security Role */}
      {isSecurity && (
        <>
          <NavLink to="/security" className={navLinkClass}>
            <Shield className="w-5 h-5 mr-3" />
            Security Dashboard
          </NavLink>
          <NavLink to="/gate-entry" className={navLinkClass}>
            <Home className="w-5 h-5 mr-3" />
            Gate Entry Management
          </NavLink>
          <NavLink to="/vehicle-entry" className={navLinkClass}>
            <Car className="w-5 h-5 mr-3" />
            Vehicle Entry Management
          </NavLink>
          <NavLink to="/delivery" className={navLinkClass}>
            <Box className="w-5 h-5 mr-3" />
            Delivery Management
          </NavLink>
          <NavLink to="/staff-worker" className={navLinkClass}>
            <Users className="w-5 h-5 mr-3" />
            Staff & Worker Entry
          </NavLink>
          <NavLink to="/emergency" className={navLinkClass}>
            <AlertCircle className="w-5 h-5 mr-3" />
            Emergency Logs & Alerts
          </NavLink>
          <NavLink to="/media-capture" className={navLinkClass}>
            <Camera className="w-5 h-5 mr-3" />
            Photo & Video Capture
          </NavLink>
          <NavLink to="/daily-report" className={navLinkClass}>
            <Calendar className="w-5 h-5 mr-3" />
            Daily Security Report
          </NavLink>
        </>
      )}

      {/* Resident Role */}
      {isResident && (
        <>
          <NavLink to="/dashboard" className={navLinkClass}>
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          <NavLink to="/visitors" className={navLinkClass}>
            <Users className="w-5 h-5 mr-3" />
            Visitors
          </NavLink>
          <NavLink to="/vehicles" className={navLinkClass}>
            <Car className="w-5 h-5 mr-3" />
            Vehicles
          </NavLink>
          <NavLink to="/complaints" className={navLinkClass}>
            <AlertCircle className="w-5 h-5 mr-3" />
            Complaints
          </NavLink>
          <NavLink to="/announcements" className={navLinkClass}>
            <Bell className="w-5 h-5 mr-3" />
            Announcements
          </NavLink>
          <NavLink to="/billing" className={navLinkClass}>
            <CreditCard className="w-5 h-5 mr-3" />
            Billing & Payments
          </NavLink>
        </>
      )}

      {/* Admin Role */}
      {isAdmin && (
        <>
          <NavLink to="/admin" className={navLinkClass}>
            <BarChart className="w-5 h-5 mr-3" />
            Admin Dashboard
          </NavLink>
          <NavLink to="/residents" className={navLinkClass}>
            <Users className="w-5 h-5 mr-3" />
            Manage Residents
          </NavLink>
          <NavLink to="/security" className={navLinkClass}>
            <Shield className="w-5 h-5 mr-3" />
            Manage Security
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;

