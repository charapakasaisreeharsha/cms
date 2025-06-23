 import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState(false);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        localStorage.setItem('visitorPhoto', imageData);
        setCaptured(true);
      }
    }
  };

  const handleNext = () => {
    navigate('/gate-entry/send-otp');
  };

  return (
    <div className="max-w-md mx-auto mt-6 text-center">
      <h2 className="text-xl font-bold mb-4">Photo Capture</h2>

      {!captured ? (
        <>
          <video ref={videoRef} autoPlay className="w-full h-auto border rounded mb-4" />
          <div className="space-x-2">
            <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-2 rounded">Start Camera</button>
            <button onClick={capturePhoto} className="bg-green-600 text-white px-4 py-2 rounded">Capture Photo</button>
          </div>
        </>
      ) : (
        <>
          <canvas ref={canvasRef} width="300" height="200" className="border rounded mb-4" />
          <p className="text-green-600 font-medium mb-4">Photo Captured Successfully!</p>
          <button onClick={handleNext} className="bg-green-600 text-white px-4 py-2 rounded">Next</button>
        </>
      )}
    </div>
  );
};

export default PhotoCapture;
