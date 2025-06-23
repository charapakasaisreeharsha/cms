 import React from 'react';
import { Bell, Users, Clock } from 'lucide-react';
import Card from '../components/common/Card';

const SecurityDashboard = () => {
  // Dummy data
  const guardName = 'xyz';
  const logTime = '11:00 AM';
  const visitorCount = 38;
  const alerts = [
    'Suspicious delivery in Block B',
    'Emergency alert from Flat 402'
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Security Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-4">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Logged In As</p>
              <p className="text-lg font-semibold">{guardName}</p>
              <p className="text-xs text-gray-400">Log Time: {logTime}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Visitors Today</p>
              <p className="text-2xl font-bold">{visitorCount}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <Bell className="w-8 h-8 text-red-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Alerts</p>
              <ul className="list-disc ml-4 text-sm text-red-700">
                {alerts.map((alert, index) => (
                  <li key={index}>{alert}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecurityDashboard;
