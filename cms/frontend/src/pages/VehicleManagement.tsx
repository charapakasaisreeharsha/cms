import React from 'react';
import Card from '../components/common/Card';

const VehicleManagement = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Vehicle Management</h1>
      
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Registered Vehicles</h2>
          <p className="text-gray-600">Manage your community's vehicles, parking assignments, and visitor parking passes.</p>
          
          {/* Vehicle management content will be implemented here */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-center text-gray-500">Vehicle management interface coming soon.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VehicleManagement;