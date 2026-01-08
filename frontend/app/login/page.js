'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      router.push('/trip-planner');
    } catch (error) {
      // Error already handled by toast in AuthContext
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50 py-12">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-divine rounded-full mb-6 animate-float">
                <GiTempleGate className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-divine bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to continue your divine journey
              </p>
            </div>

            {/* Login Card */}
            <div className="card bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`input pl-12 ${errors.email ? 'input-error' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`input pl-12 pr-12 ${errors.password ? 'input-error' : ''}`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-krishna-600 rounded focus:ring-krishna-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-krishna-600 hover:text-krishna-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="spinner border-white border-t-transparent" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons (Placeholder) */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="btn-outline flex items-center justify-center space-x-2"
                  disabled
                >
                  <span>🔵</span>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="btn-outline flex items-center justify-center space-x-2"
                  disabled
                >
                  <span>📱</span>
                  <span>Phone</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="text-krishna-600 hover:text-krishna-700 font-semibold"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>🔒</span>
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>✅</span>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🙏</span>
                  <span>Trusted by 1000+</span>
                </div>
              </div>
            </div>

            {/* Spiritual Quote */}
            <div className="mt-8 text-center">
              <p className="text-lg italic text-gray-600">
                "Jai Shri Krishna 🙏"
              </p>
              <p className="text-sm text-gray-500 mt-1">
                May your journey be filled with divine blessings
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
