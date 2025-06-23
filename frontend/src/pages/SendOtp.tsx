 import React from 'react';
import { useNavigate } from 'react-router-dom';

const SendOtp: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Trigger OTP logic here
    navigate('/gate-entry/entry-pass');
  };

  return (
    <div className="max-w-md mx-auto mt-6 text-center">
      <h2 className="text-xl font-bold mb-4">Send OTP to Resident</h2>
      <p className="text-sm text-gray-600">OTP has been sent to the resident for approval.</p>
      <button onClick={handleNext} className="mt-6 bg-green-600 text-white px-4 py-2 rounded">Generate Entry Pass</button>
    </div>
  );
};

export default SendOtp;