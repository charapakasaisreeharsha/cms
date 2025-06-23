 import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, User, Phone, Car, Camera, Send, QrCode } from 'lucide-react';
import ActionTile from '../components/common/ActionTile';

const GateEntryManagement: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: User,
      title: 'Capture Visitor Details',
      description: 'Name, Phone, Purpose',
      to: '/gate-entry/visitor-form',
      color: 'bg-blue-500 text-white'
    },
    {
      icon: ClipboardList,
      title: 'Select Flat/Resident',
      description: 'Choose whom the visitor will meet',
      to: '/gate-entry/select-resident',
      color: 'bg-indigo-500 text-white'
    },
    {
      icon: Car,
      title: 'Add Vehicle Details',
      description: 'Optional: Add vehicle number and type',
      to: '/gate-entry/vehicle-details',
      color: 'bg-cyan-600 text-white'
    },
    {
      icon: Camera,
      title: 'Capture Photo',
      description: 'Take a photo of the visitor',
      to: '/gate-entry/photo-capture',
      color: 'bg-pink-500 text-white'
    },
    {
      icon: Send,
      title: 'Send OTP to Resident',
      description: 'Resident will approve entry',
      to: '/gate-entry/send-otp',
      color: 'bg-amber-500 text-white'
    },
    {
      icon: QrCode,
      title: 'Generate Entry Pass',
      description: 'Optionally generate QR code pass',
      to: '/gate-entry/entry-pass',
      color: 'bg-green-600 text-white'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
        <h2 className="text-lg font-semibold text-primary">Visitor Entry Flow</h2>
        <p className="text-sm text-gray-600">Follow the step-by-step process to log and approve visitor entry.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <ActionTile
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            to={step.to}
            color={step.color}
          />
        ))}
      </div>
    </div>
  );
};

export default GateEntryManagement;
