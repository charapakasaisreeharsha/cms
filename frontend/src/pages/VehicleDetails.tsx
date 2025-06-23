 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleDetails: React.FC = () => {
  const [vehicle, setVehicle] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    localStorage.setItem('vehicleDetails', vehicle);
    navigate('/gate-entry/photo-capture');
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Vehicle Details (Optional)</h2>
      <input
        type="text"
        placeholder="Vehicle Number"
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button onClick={handleNext} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
};

export default VehicleDetails;