 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ComplaintManagement from './pages/ComplaintManagement';
import Announcements from './pages/Announcements';
import NewAnnouncement from './pages/NewAnnouncement';
import BillingPayments from './pages/BillingPayments';
import VehicleManagement from './pages/VehicleManagement';
import SecurityInterface from './pages/SecurityInterface';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/common/ProtectedRoute';
import Profile from './pages/Profile';

// 🚪 Gate Entry Management Pages
import GateEntryManagement from './pages/GateEntryManagement';
import VisitorForm from './pages/VisitorForm';
import SelectResident from './pages/SelectResident';
import VehicleDetails from './pages/VehicleDetails';
import PhotoCapture from './pages/PhotoCapture';
import SendOtp from './pages/SendOtp';
import EntryPass from './pages/EntryPass';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/complaints" element={<ComplaintManagement />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/announcements/new" element={<NewAnnouncement />} />
            <Route path="/billing" element={<BillingPayments />} />
            <Route path="/vehicles" element={<VehicleManagement />} />
            <Route path="/security" element={<SecurityInterface />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />

            {/* 🔐 Gate Entry Management */}
            <Route path="/gate-entry" element={<GateEntryManagement />} />
            <Route path="/gate-entry/visitor-form" element={<VisitorForm />} />
            <Route path="/gate-entry/select-resident" element={<SelectResident />} />
            <Route path="/gate-entry/vehicle-details" element={<VehicleDetails />} />
            <Route path="/gate-entry/photo-capture" element={<PhotoCapture />} />
            <Route path="/gate-entry/send-otp" element={<SendOtp />} />
            <Route path="/gate-entry/entry-pass" element={<EntryPass />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
