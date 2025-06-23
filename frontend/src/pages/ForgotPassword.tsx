 import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  const sendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { mobile });
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Please check the mobile number.');
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        mobile,
        otp,
        password,
      });
      alert('Password reset successful.');
      navigate('/login');
    } catch (err) {
      setError('Invalid OTP or password reset failed.');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <h2 className="mt-6 text-3xl font-extrabold text-primary text-center">Smart Society</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            {step === 1 ? 'Forgot Password - Step 1' : 'Reset Password - Step 2'}
          </p>

          {error && <div className="mt-4 p-3 text-sm text-red-800 bg-red-100 rounded-md">{error}</div>}

          <form className="mt-8 space-y-6">
            {step === 1 ? (
              <>
                <Input
                  label="Mobile Number"
                  type="text"
                  placeholder="Enter your 10-digit number"
                  value={mobile}
                  onChange={handleChange(setMobile)}
                  required
                  fullWidth
                />
                <Button type="button" onClick={sendOtp} fullWidth disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <Input
                  label="Enter OTP"
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={handleChange(setOtp)}
                  required
                  fullWidth
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handleChange(setPassword)}
                  required
                  fullWidth
                />
                <Button type="button" onClick={verifyOtp} fullWidth disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </>
            )}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-primary hover:underline inline-flex items-center mt-2"
              >
                <ArrowLeft className="mr-1 w-4 h-4" /> Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
