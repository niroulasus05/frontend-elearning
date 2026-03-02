import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAdmin();

  const from = location.state?.from?.pathname || '/admin/home';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise(res => setTimeout(res, 800));

      const isValidUser =
        (formData.email === 'user123@elearn.com' && formData.password === 'admin123') ||
        (formData.email === 'demo123@elearn.com' && formData.password === 'demo123');

      if (!isValidUser) {
        setErrors({ general: 'Invalid email or password' });
        return;
      }

      const userData = {
        id: 1,
        name: formData.email === 'user123@elearn.com' ? 'Admin User' : 'Demo User',
        email: formData.email,
        role: 'admin',
        loginTime: new Date().toISOString()
      };

      login(userData);
      navigate(from, { replace: true });

    } catch (error) {
      console.error(error);
      setErrors({ general: 'Login failed. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({ email: 'demo123@elearn.com', password: 'demo123' });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">

        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {errors.general && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded pr-8"
            />
            {formData.email && (
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, email: '' }))}
                className="absolute right-2 top-3"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border rounded pr-16"
            />
            <div className="absolute right-2 top-3 flex gap-2">
              <button type="button" onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, password: '' }))}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={handleDemoFill}
            className="w-full text-sm text-blue-600 border border-blue-200 py-2 rounded hover:bg-blue-50 transition"
          >
            Use Demo Admin
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600">Register</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;