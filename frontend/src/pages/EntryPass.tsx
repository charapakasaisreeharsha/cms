 import React from 'react';

const EntryPass: React.FC = () => {
  const visitorInfo = JSON.parse(localStorage.getItem('visitorInfo') || '{}');
  const flat = localStorage.getItem('flatResident');
  const vehicle = localStorage.getItem('vehicleDetails');

  return (
    <div className="max-w-md mx-auto mt-6 border p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Entry Pass</h2>
      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {visitorInfo.name}</p>
        <p><strong>Phone:</strong> {visitorInfo.phone}</p>
        <p><strong>Purpose:</strong> {visitorInfo.purpose}</p>
        <p><strong>Flat/Resident:</strong> {flat}</p>
        <p><strong>Vehicle:</strong> {vehicle || 'N/A'}</p>
      </div>
      <p className="mt-4 text-green-600 font-semibold">Access Granted</p>
    </div>
  );
};

export default EntryPass;