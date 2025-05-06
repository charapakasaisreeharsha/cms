import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import {
  UserPlus,
  Clock,
  Check,
  X,
  Share2,
  QrCode,
  Calendar,
  Phone,
  Mail,
  Home
} from 'lucide-react';

const VisitorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [visitorName, setVisitorName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [expectedTime, setExpectedTime] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedVisitor, setSubmittedVisitor] = useState<any>(null);

  // Sample visitor history data
  const visitorHistory = [
    {
      id: 1,
      name: 'John Smith',
      purpose: 'Delivery',
      date: '2025-05-15',
      time: '10:30 AM',
      status: 'checked-out',
      checkInTime: '10:32 AM',
      checkOutTime: '10:45 AM'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      purpose: 'Guest',
      date: '2025-05-14',
      time: '04:00 PM',
      status: 'checked-out',
      checkInTime: '04:15 PM',
      checkOutTime: '07:30 PM'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      purpose: 'Maintenance',
      date: '2025-05-16',
      time: '02:00 PM',
      status: 'expected',
      checkInTime: null,
      checkOutTime: null
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const visitor = {
      id: Date.now(),
      name: visitorName,
      purpose,
      date: expectedDate,
      time: expectedTime,
      status: 'expected',
      phone
    };
    
    setSubmittedVisitor(visitor);
    setActiveTab('confirmation');
    
    // Reset form
    setVisitorName('');
    setPurpose('');
    setExpectedTime('');
    setExpectedDate('');
    setPhone('');
  };

  const resetForm = () => {
    setSubmittedVisitor(null);
    setActiveTab('register');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Visitor Management</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="register">
            <UserPlus className="w-4 h-4 mr-2" />
            Register
          </TabsTrigger>
          {submittedVisitor && (
            <TabsTrigger value="confirmation">
              <Check className="w-4 h-4 mr-2" />
              Confirmation
            </TabsTrigger>
          )}
          <TabsTrigger value="history">
            <Clock className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="register" className="pt-4">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Pre-register a Visitor</h2>
              
              <Input
                label="Visitor Name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Enter visitor's full name"
                fullWidth
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter visitor's phone number"
                fullWidth
                required
              />
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Expected Date"
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  fullWidth
                  required
                />
                
                <Input
                  label="Expected Time"
                  type="time"
                  value={expectedTime}
                  onChange={(e) => setExpectedTime(e.target.value)}
                  fullWidth
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Purpose of Visit
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="Guest">Guest</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button type="submit" fullWidth>
                  Register Visitor
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="confirmation" className="pt-4">
          {submittedVisitor && (
            <Card className="overflow-visible">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Visitor Registered Successfully!</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Your visitor has been pre-registered. Please share the details with them.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Visitor</p>
                    <p className="text-sm font-medium flex items-center">
                      <UserPlus className="w-4 h-4 mr-1 text-gray-400" />
                      {submittedVisitor.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Purpose</p>
                    <p className="text-sm font-medium">{submittedVisitor.purpose}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {submittedVisitor.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {submittedVisitor.time}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 flex justify-center">
                <div className="bg-white p-2 border border-gray-200 rounded-lg">
                  <QrCode className="w-32 h-32 mx-auto text-primary" />
                  <p className="text-center text-xs mt-1 font-medium">VISITOR-{submittedVisitor.id}</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button fullWidth>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Visitor
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Register Another Visitor
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <Card>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Visitor History</h2>
            
            <div className="space-y-4">
              {visitorHistory.map((visitor) => (
                <div 
                  key={visitor.id} 
                  className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-4 ${
                      visitor.status === 'checked-out' 
                        ? 'bg-green-100' 
                        : visitor.status === 'checked-in' 
                          ? 'bg-blue-100' 
                          : 'bg-amber-100'
                    }`}>
                      {visitor.status === 'checked-out' ? (
                        <Check className={`w-5 h-5 text-green-600`} />
                      ) : visitor.status === 'checked-in' ? (
                        <Home className={`w-5 h-5 text-blue-600`} />
                      ) : (
                        <Clock className={`w-5 h-5 text-amber-600`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{visitor.name}</h3>
                          <p className="text-sm text-gray-600">{visitor.purpose}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {visitor.date} · {visitor.time}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center text-xs">
                        <div className={`flex items-center ${
                          visitor.status === 'checked-out' || visitor.status === 'checked-in'
                            ? 'text-green-600' 
                            : 'text-gray-400'
                        }`}>
                          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                          <div className="ml-1">Registered</div>
                        </div>
                        
                        <div className="w-8 h-0.5 bg-gray-200"></div>
                        
                        <div className={`flex items-center ${
                          visitor.status === 'checked-out' || visitor.status === 'checked-in'
                            ? 'text-green-600' 
                            : 'text-gray-400'
                        }`}>
                          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                            <Home className="w-3 h-3" />
                          </div>
                          <div className="ml-1">
                            {visitor.checkInTime ? `Checked In (${visitor.checkInTime})` : 'Check In'}
                          </div>
                        </div>
                        
                        <div className="w-8 h-0.5 bg-gray-200"></div>
                        
                        <div className={`flex items-center ${
                          visitor.status === 'checked-out' ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                            <X className="w-3 h-3" />
                          </div>
                          <div className="ml-1">
                            {visitor.checkOutTime ? `Checked Out (${visitor.checkOutTime})` : 'Check Out'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisitorManagement;