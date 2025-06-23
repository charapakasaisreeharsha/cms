 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VisitorForm: React.FC = () => {
  const [visitor, setVisitor] = useState({ name: '', phone: '', purpose: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitor({ ...visitor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can store this in context or localStorage
    localStorage.setItem('visitorInfo', JSON.stringify(visitor));
    navigate('/gate-entry/select-resident');
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Visitor Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Visitor Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="purpose" placeholder="Purpose of Visit" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Next</button>
      </form>
    </div>
  );
};
export default VisitorForm;