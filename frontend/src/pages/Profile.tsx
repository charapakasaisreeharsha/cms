import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="p-6">Loading user information...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-gray-900">{user.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <p className="mt-1 text-gray-900">{user.phone_number}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <p className="mt-1 text-gray-900">{user.unit || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="mt-1 text-gray-900">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
