'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import { toast } from 'react-hot-toast';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiLock,
  FiEdit2,
  FiSave,
  FiX,
  FiMapPin,
  FiCalendar,
  FiAward,
  FiShield,
  FiTrendingUp,
  FiHeart,
  FiSettings
} from 'react-icons/fi';
import { GiTempleGate, GiIndiaGate } from 'react-icons/gi';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, setUser } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('overview'); // overview, edit, password, preferences
  const [loading, setLoading] = useState(false);
  
  // Edit Profile State
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Change Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Preferences State
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [],
    interests: [],
    newsletter: false
  });

  const [stats, setStats] = useState({
    totalTrips: 0,
    placesVisited: 0,
    moneySaved: 0,
    fraudReports: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
      setPreferences(user.preferences || {
        dietaryRestrictions: [],
        interests: [],
        newsletter: false
      });
    }
    
    fetchUserStats();
  }, [isAuthenticated, user]);

  const fetchUserStats = async () => {
    try {
      // Simulated stats - in production, call actual API endpoint
      setStats({
        totalTrips: 5,
        placesVisited: 23,
        moneySaved: 1500,
        fraudReports: 2
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!editForm.name || !editForm.email) {
      toast.error('Name and email are required');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.updateProfile(editForm);
      setUser(response.data.user);
      toast.success('Profile updated successfully! 🎉');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error('All password fields are required');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setChangingPassword(true);
      await authService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      toast.success('Password changed successfully! 🔒');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error changing password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleUpdatePreferences = async () => {
    try {
      setLoading(true);
      await authService.updateProfile({ preferences });
      toast.success('Preferences updated! ✨');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating preferences');
    } finally {
      setLoading(false);
    }
  };

  const toggleDietaryRestriction = (restriction) => {
    const current = preferences.dietaryRestrictions || [];
    const updated = current.includes(restriction)
      ? current.filter((r) => r !== restriction)
      : [...current, restriction];
    setPreferences({ ...preferences, dietaryRestrictions: updated });
  };

  const toggleInterest = (interest) => {
    const current = preferences.interests || [];
    const updated = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    setPreferences({ ...preferences, interests: updated });
  };

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Jain', 'Satvik', 'No Onion/Garlic'];
  const interestOptions = ['Temples', 'Heritage Sites', 'Nature', 'Festivals', 'Photography', 'Meditation'];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="heading">My Profile</span>
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center sticky top-8">
              {/* Profile Picture Placeholder */}
              <div className="w-32 h-32 bg-gradient-divine rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {user.name}
              </h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              {/* Credibility Score */}
              <div className="bg-gradient-to-br from-krishna-50 to-radha-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FiShield className="text-2xl text-krishna-600" />
                  <span className="text-sm text-gray-600">Credibility Score</span>
                </div>
                <p className="text-3xl font-bold text-krishna-600">
                  {user.reportCredibility || 100}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <GiTempleGate className="text-2xl text-krishna-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-800">{stats.totalTrips}</p>
                  <p className="text-xs text-gray-600">Trips</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <FiMapPin className="text-2xl text-radha-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-800">{stats.placesVisited}</p>
                  <p className="text-xs text-gray-600">Places</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="text-sm text-gray-600 mb-4">
                <FiCalendar className="inline mr-2" />
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full btn-outline text-red-600 border-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { id: 'overview', label: 'Overview', icon: FiUser },
                { id: 'edit', label: 'Edit Profile', icon: FiEdit2 },
                { id: 'password', label: 'Password', icon: FiLock },
                { id: 'preferences', label: 'Preferences', icon: FiSettings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-krishna text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-krishna rounded-xl flex items-center justify-center">
                        <GiTempleGate className="text-2xl text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">{stats.totalTrips}</p>
                        <p className="text-gray-600">Total Trips</p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-radha rounded-xl flex items-center justify-center">
                        <FiMapPin className="text-2xl text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">{stats.placesVisited}</p>
                        <p className="text-gray-600">Places Visited</p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-xl flex items-center justify-center">
                        <FiTrendingUp className="text-2xl text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">₹{stats.moneySaved}</p>
                        <p className="text-gray-600">Money Saved</p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                        <FiShield className="text-2xl text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">{stats.fraudReports}</p>
                        <p className="text-gray-600">Fraud Reports</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FiUser className="text-krishna-600" />
                      <span className="font-medium">Name:</span>
                      <span>{user.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <FiMail className="text-krishna-600" />
                      <span className="font-medium">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <FiPhone className="text-krishna-600" />
                        <span className="font-medium">Phone:</span>
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === 'edit' && (
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiPhone className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="input"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex-1"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="spinner"></span>
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FiSave />
                          Save Changes
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditForm({
                          name: user.name || '',
                          email: user.email || '',
                          phone: user.phone || ''
                        });
                      }}
                      className="btn-outline"
                    >
                      <FiX className="inline mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h3>
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="input"
                      required
                      minLength={6}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Must be at least 6 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="btn-primary w-full"
                  >
                    {changingPassword ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="spinner"></span>
                        Changing Password...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FiLock />
                        Change Password
                      </span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Preferences</h3>
                
                <div className="space-y-8">
                  {/* Dietary Restrictions */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Dietary Restrictions
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleDietaryRestriction(option)}
                          className={`px-4 py-2 rounded-xl border-2 transition-all ${
                            (preferences.dietaryRestrictions || []).includes(option)
                              ? 'border-krishna-500 bg-krishna-50 text-krishna-700'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {interestOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleInterest(option)}
                          className={`px-4 py-2 rounded-xl border-2 transition-all ${
                            (preferences.interests || []).includes(option)
                              ? 'border-radha-500 bg-radha-50 text-radha-700'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.newsletter}
                        onChange={(e) => setPreferences({ ...preferences, newsletter: e.target.checked })}
                        className="w-5 h-5 text-krishna-600 rounded"
                      />
                      <span className="text-gray-700">
                        Subscribe to newsletter for updates and special offers
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={handleUpdatePreferences}
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="spinner"></span>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FiSave />
                        Save Preferences
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
