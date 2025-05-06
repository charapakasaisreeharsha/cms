import React from 'react';
import Card from '../components/common/Card';

const SecurityInterface = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Interface</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Security Alerts">
          <p className="text-gray-600">No active security alerts at this time.</p>
        </Card>
        
        <Card title="Access Logs">
          <p className="text-gray-600">Recent access logs will appear here.</p>
        </Card>
        
        <Card title="Security Cameras">
          <p className="text-gray-600">Security camera feeds will be displayed here.</p>
        </Card>
        
        <Card title="Guard Schedule">
          <p className="text-gray-600">Security personnel schedule will appear here.</p>
        </Card>
      </div>
    </div>
  );
};

export default SecurityInterface;