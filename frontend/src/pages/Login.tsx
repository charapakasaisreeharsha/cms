 import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Home, Shield, BarChart, ArrowLeft } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

interface LocationState {
  from?: { pathname: string };
}

type Role = 'resident' | 'security' | 'admin';

interface SignupPayload {
  phone_number: string;
  password: string;
  role: Role;
  name: string;
  unit?: string;
  employee_id?: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as LocationState)?.from?.pathname || '/';

  const validatePhoneNumber = (phone: string): boolean => /^\d{10}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) return setError('Please select a role.');
    if (!validatePhoneNumber(phoneNumber)) return setError('Please enter a valid 10-digit phone number.');

    try {
      if (isLogin) {
        await login(phoneNumber, password, role);
      } else {
        const apiBase = import.meta.env.VITE_BACKEND_API_URL.replace(/\/+$/, '');
        const signupUrl = `${apiBase}/auth/signup`;

        const payload: SignupPayload = {
          phone_number: phoneNumber,
          password,
          role,
          name,
          ...(role === 'resident' || role === 'admin' ? { unit } : {}),
          ...(role === 'security' ? { employee_id: employeeId } : {}),
        };

        await axios.post(signupUrl, payload);
        await login(phoneNumber, password, role);
      }

      if (role === 'admin') navigate('/admin', { replace: true });
      else if (role === 'resident') navigate('/dashboard', { replace: true });
      else if (role === 'security') navigate('/security', { replace: true });
    } catch (err) {
      const axiosError = err as AxiosError;
      const message =
        axiosError.response?.data && typeof axiosError.response.data === 'object'
          ? (axiosError.response.data as any).error
          : undefined;

      setError(
        message ||
          (isLogin
            ? 'Invalid credentials. Please try again.'
            : 'Registration failed. Please try again.')
      );
    }
  };

  const handleRoleSelect = (selectedRole: Role) => {
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

          {!role ? (
            <div className="mt-8 space-y-4">
              <button onClick={() => handleRoleSelect('resident')} className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50">
                <Home className="inline mr-2 text-primary" /> Resident
              </button>
              <button onClick={() => handleRoleSelect('security')} className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50">
                <Shield className="inline mr-2 text-primary" /> Security
              </button>
              <button onClick={() => handleRoleSelect('admin')} className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50">
                <BarChart className="inline mr-2 text-primary" /> Admin
              </button>
              <div className="text-center mt-4">
                <button type="button" onClick={isLogin ? handleSwitchToSignup : handleSwitchToLogin} className="text-sm text-primary hover:underline">
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">{error}</div>}

              {!isLogin && (
                <>
                  <Input label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} required fullWidth />
                  {(role === 'resident' || role === 'admin') ? (
                    <Input label="Unit Number" type="text" value={unit} onChange={e => setUnit(e.target.value)} required fullWidth />
                  ) : (
                    <Input label="Employee ID" type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} required fullWidth />
                  )}
                </>
              )}

              <Input label="Phone Number" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required fullWidth pattern="[0-9]{10}" placeholder="1234567890" />
              <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth />

              {isLogin && (
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              )}

              <Button type="submit" fullWidth>{isLogin ? 'Sign in' : 'Sign up'}</Button>

              <div className="text-center">
                <button type="button" onClick={handleBackToRoleSelection} className="text-sm text-primary hover:underline inline-flex items-center">
                  <ArrowLeft className="mr-1 w-4 h-4" /> Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
