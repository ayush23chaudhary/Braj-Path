'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiMail, FiArrowLeft, FiCheckCircle, FiSend } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      
      // TODO: Replace with actual API call when backend endpoint is ready
      // await authService.forgotPassword({ email });
      
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      toast.success('Password reset link sent to your email! 📧');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending reset link. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-krishna-600 mb-6 transition-colors"
        >
          <FiArrowLeft />
          Back to Login
        </Link>

        <div className="card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-divine rounded-full mb-4 animate-float">
              <GiTempleGate className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="heading">Forgot Password?</span>
            </h1>
            <p className="text-gray-600">
              {emailSent 
                ? 'Check your email for reset instructions'
                : 'Enter your email to receive a password reset link'}
            </p>
          </div>

          {!emailSent ? (
            // Email Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-12"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner"></span>
                    Sending Link...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FiSend />
                    Send Reset Link
                  </span>
                )}
              </button>
            </form>
          ) : (
            // Success Message
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <FiCheckCircle className="text-green-600 text-4xl" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Email Sent Successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  We've sent a password reset link to:
                </p>
                <p className="text-krishna-600 font-semibold mb-6">
                  {email}
                </p>
                <p className="text-sm text-gray-600">
                  Please check your inbox and click the link to reset your password. 
                  The link will expire in 1 hour for security reasons.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <p className="text-sm text-gray-600">
                  Didn't receive the email?
                </p>
                <button
                  onClick={() => setEmailSent(false)}
                  className="btn-outline w-full"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!emailSent && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="text-krishna-600 hover:text-krishna-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          )}

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>🔒 Security Note:</strong> For your protection, password reset links 
                expire after 1 hour. If you didn't request this, you can safely ignore this message.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:support@brajpath.com" className="text-krishna-600 hover:underline">
                support@brajpath.com
              </a>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Private</span>
          </div>
        </div>

        {/* Spiritual Quote */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 italic">
            "Hare Krishna Hare Krishna, Krishna Krishna Hare Hare" 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
