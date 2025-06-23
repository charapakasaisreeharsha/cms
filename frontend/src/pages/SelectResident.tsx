 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectResident: React.FC = () => {
  const [flat, setFlat] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    localStorage.setItem('flatResident', flat);
    navigate('/gate-entry/vehicle-details');
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Select Flat/Resident</h2>
      <input
        type="text"
        placeholder="Flat Number or Resident Name"
        value={flat}
        onChange={(e) => setFlat(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button onClick={handleNext} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
};

export default SelectResident;