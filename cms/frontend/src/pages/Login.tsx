import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import { Home, Shield, BarChart, ArrowLeft } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

interface LocationState {
  from?: { pathname: string };
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState<'resident' | 'security' | 'admin' | ''>('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as LocationState)?.from?.pathname || '/';

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select a role.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      if (isLogin) {
        // Handle login
        await login(phoneNumber, password, role);
      } else {
        // Handle signup
        const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
        const payload: any = {
          phone_number: phoneNumber,
          password,
          role,
          name,
          ...(role === 'resident' || role === 'admin' ? { unit } : {}),
          ...(role === 'security' ? { employee_id: employeeId } : {}),
        };
        const response = await axios.post(`${apiUrl}/signup`, payload);
        // After successful signup, automatically log in
        await login(phoneNumber, password, role);
      }

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (role === 'resident') {
        navigate('/dashboard', { replace: true });
      } else if (role === 'security') {
        navigate('/security', { replace: true });
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(
        err.response?.data?.error ||
        (isLogin ? 'Invalid credentials. Please try again.' : 'Registration failed. Please try again.')
      );
    }
  };

  const handleRoleSelect = (selectedRole: 'resident' | 'security' | 'admin') => {
    setRole(selectedRole);
    setError('');
  };

  const handleBackToRoleSelection = () => {
    setRole('');
    setName('');
    setUnit('');
    setEmployeeId('');
    setPhoneNumber('');
    setPassword('');
    setError('');
  };

  const handleSwitchToSignup = () => {
    setIsLogin(false);
    setError('');
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    setError('');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-primary">Smart Society</h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin
                ? role
                  ? `Sign in as ${role}`
                  : 'Select a role to sign in'
                : role
                ? `Create your ${role} account`
                : 'Select a role to sign up'}
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              {(!isLogin && !role) || (isLogin && !role) ? (
                <div className="space-y-4">
                  <button
                    onClick={() => handleRoleSelect('resident')}
                    className="flex flex-col items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 w-full"
                  >
                    <Home className="w-5 h-5 mb-1 text-primary" />
                    Resident
                  </button>
                  <button
                    onClick={() => handleRoleSelect('security')}
                    className="flex flex-col items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 w-full"
                  >
                    <Shield className="w-5 h-5 mb-1 text-primary" />
                    Security
                  </button>
                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className="flex flex-col items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 w-full"
                  >
                    <BarChart className="w-5 h-5 mb-1 text-primary" />
                    Admin
                  </button>
                  {isLogin && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleSwitchToSignup}
                        className="text-sm text-primary hover:underline"
                      >
                        Don't have an account? Sign up
                      </button>
                    </div>
                  )}
                  {!isLogin && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleSwitchToLogin}
                        className="text-sm text-primary hover:underline"
                      >
                        Already have an account? Sign in
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
                      {error}
                    </div>
                  )}

                  {!isLogin && (
                    <>
                      <Input
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                      />
                      {(role === 'resident' || role === 'admin') ? (
                        <Input
                          label="Unit Number"
                          type="text"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          required
                          fullWidth
                        />
                      ) : (
                        <Input
                          label="Employee ID"
                          type="text"
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                          required
                          fullWidth
                        />
                      )}
                    </>
                  )}

                  <Input
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    fullWidth
                    pattern="[0-9]{10}"
                    placeholder="1234567890"
                  />

                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                  />

                  <div>
                    <Button type="submit" fullWidth>
                      {isLogin ? 'Sign in' : 'Sign up'}
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      onClick={isLogin ? handleSwitchToSignup : handleSwitchToLogin}
                      className="text-sm text-primary hover:underline"
                    >
                      {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                    <div>
                      <button
                        type="button"
                        onClick={handleBackToRoleSelection}
                        className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to role selection
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex-1 hidden lg:block">
        <div
          className="object-cover w-full h-full"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-primary/40"></div>
          <div className="absolute inset-0 flex flex-col items-start justify-center p-16 text-white">
            <h1 className="text-4xl font-bold">Welcome to Smart Society</h1>
            <p className="mt-2 text-xl">Making community living smarter and more convenient</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;