'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { transportService, fraudService } from '@/services/api';
import { toast } from 'react-hot-toast';
import { 
  FiAlertTriangle, 
  FiDollarSign, 
  FiMapPin, 
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiThumbsUp,
  FiThumbsDown,
  FiUsers,
  FiTrendingUp,
  FiShield
} from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function FraudCheckPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('check'); // check, report, reports, stats
  
  // Price Check State
  const [checkForm, setCheckForm] = useState({
    route: '',
    transportType: 'rickshaw',
    price: ''
  });
  const [priceCheckResult, setPriceCheckResult] = useState(null);
  const [checkingPrice, setCheckingPrice] = useState(false);

  // Report Fraud State
  const [reportForm, setReportForm] = useState({
    route: '',
    transportType: 'rickshaw',
    actualPrice: '',
    fairPrice: '',
    description: '',
    location: ''
  });
  const [submittingReport, setSubmittingReport] = useState(false);

  // Reports List State
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [stats, setStats] = useState(null);

  const transportTypes = [
    { value: 'rickshaw', label: 'Auto Rickshaw', icon: FiTruck },
    { value: 'taxi', label: 'Taxi', icon: FiTruck },
    { value: 'tempo', label: 'Tempo', icon: FiTruck },
    { value: 'e-rickshaw', label: 'E-Rickshaw', icon: FiTruck }
  ];

  const popularRoutes = [
    'Mathura Junction to Banke Bihari Temple',
    'Mathura Junction to ISKCON Vrindavan',
    'ISKCON Vrindavan to Banke Bihari Temple',
    'Mathura Railway Station to Dwarkadhish Temple',
    'Vrindavan Bus Stand to Prem Mandir',
    'Mathura to Vrindavan',
    'Govardhan to Mathura',
    'Barsana to Nandgaon'
  ];

  useEffect(() => {
    if (activeTab === 'reports') {
      fetchReports();
    }
    if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab]);

  const handleCheckPrice = async (e) => {
    e.preventDefault();
    
    if (!checkForm.route || !checkForm.price) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setCheckingPrice(true);
      
      // Parse route to get from and to
      const routeParts = checkForm.route.split(' to ');
      const from = routeParts[0] || checkForm.route;
      const to = routeParts[1] || checkForm.route;
      
      const response = await transportService.checkPrice(
        from,
        to,
        checkForm.transportType,
        parseFloat(checkForm.price)
      );
      
      setPriceCheckResult(response);
      
      if (response.isFair) {
        toast.success('Price is fair! ✅');
      } else {
        toast.error(`Overcharged by ₹${response.difference}!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error checking price');
      console.error('Price check error:', error);
    } finally {
      setCheckingPrice(false);
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit fraud reports');
      return;
    }

    if (!reportForm.route || !reportForm.actualPrice || !reportForm.description) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setSubmittingReport(true);
      await fraudService.submitReport({
        route: reportForm.route,
        transportType: reportForm.transportType,
        actualPrice: parseFloat(reportForm.actualPrice),
        fairPrice: reportForm.fairPrice ? parseFloat(reportForm.fairPrice) : undefined,
        description: reportForm.description,
        location: reportForm.location
      });
      
      toast.success('Thank you! Your report helps the community 🙏');
      setReportForm({
        route: '',
        transportType: 'rickshaw',
        actualPrice: '',
        fairPrice: '',
        description: '',
        location: ''
      });
      setActiveTab('reports');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting report');
      console.error('Report submission error:', error);
    } finally {
      setSubmittingReport(false);
    }
  };

  const fetchReports = async () => {
    try {
      setLoadingReports(true);
      const response = await fraudService.getReports();
      // Backend returns: { success, count, data: [...] }
      setReports(response.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Set empty array on error
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fraudService.getStats();
      // Backend returns: { success, data: { stats... } }
      setStats(response.data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({});
    }
  };

  const handleVote = async (reportId, voteType) => {
    if (!isAuthenticated) {
      toast.error('Please login to vote');
      return;
    }

    try {
      await fraudService.voteOnReport(reportId, voteType);
      toast.success('Vote recorded! Thank you 🙏');
      fetchReports(); // Refresh reports
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error voting');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-radha rounded-full mb-4 animate-float">
            <FiShield className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="heading">Price Protection Center</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Check fair prices, report fraud, and help protect fellow travelers from overcharging
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {[
            { id: 'check', label: 'Check Price', icon: FiDollarSign },
            { id: 'report', label: 'Report Fraud', icon: FiAlertTriangle },
            { id: 'reports', label: 'Community Reports', icon: FiUsers },
            { id: 'stats', label: 'Statistics', icon: FiTrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-krishna text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="text-xl" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Check Price Tab */}
        {activeTab === 'check' && (
          <div className="max-w-2xl mx-auto">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FiDollarSign className="text-krishna-600" />
                Check if Price is Fair
              </h2>
              
              <form onSubmit={handleCheckPrice} className="space-y-6">
                {/* Route Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMapPin className="inline mr-2" />
                    Select Route
                  </label>
                  <select
                    value={checkForm.route}
                    onChange={(e) => setCheckForm({ ...checkForm, route: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Choose a route...</option>
                    {popularRoutes.map((route) => (
                      <option key={route} value={route}>{route}</option>
                    ))}
                    <option value="custom">Custom Route</option>
                  </select>
                  {checkForm.route === 'custom' && (
                    <input
                      type="text"
                      placeholder="Enter custom route"
                      className="input mt-2"
                      onChange={(e) => setCheckForm({ ...checkForm, route: e.target.value })}
                    />
                  )}
                </div>

                {/* Transport Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiTruck className="inline mr-2" />
                    Transport Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {transportTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setCheckForm({ ...checkForm, transportType: type.value })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          checkForm.transportType === type.value
                            ? 'border-krishna-500 bg-krishna-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <type.icon className="text-3xl mx-auto mb-2 text-krishna-600" />
                        <p className="text-sm font-medium">{type.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2" />
                    Price Quoted (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter the price quoted to you"
                    value={checkForm.price}
                    onChange={(e) => setCheckForm({ ...checkForm, price: e.target.value })}
                    className="input"
                    required
                    min="0"
                  />
                </div>

                <button
                  type="submit"
                  disabled={checkingPrice}
                  className="btn-primary w-full"
                >
                  {checkingPrice ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="spinner"></span>
                      Checking...
                    </span>
                  ) : (
                    'Check Price'
                  )}
                </button>
              </form>

              {/* Price Check Result */}
              {priceCheckResult && (
                <div className={`mt-6 p-6 rounded-xl ${
                  priceCheckResult.isFair 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-start gap-4">
                    {priceCheckResult.isFair ? (
                      <FiCheckCircle className="text-3xl text-green-600 flex-shrink-0" />
                    ) : (
                      <FiXCircle className="text-3xl text-red-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${
                        priceCheckResult.isFair ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {priceCheckResult.isFair ? 'Fair Price ✅' : 'Overcharged! ⚠️'}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <strong>Fair Price Range:</strong> ₹{priceCheckResult.fairPriceRange?.min} - ₹{priceCheckResult.fairPriceRange?.max}
                        </p>
                        <p className="text-gray-700">
                          <strong>You were quoted:</strong> ₹{checkForm.price}
                        </p>
                        {!priceCheckResult.isFair && (
                          <p className="text-red-700 font-semibold">
                            <strong>Overcharged by:</strong> ₹{priceCheckResult.difference}
                          </p>
                        )}
                      </div>
                      {!priceCheckResult.isFair && (
                        <button
                          onClick={() => setActiveTab('report')}
                          className="mt-4 btn-secondary"
                        >
                          Report This Fraud
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Report Fraud Tab */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FiAlertTriangle className="text-red-600" />
                Report Fraud
              </h2>
              
              {!isAuthenticated ? (
                <div className="text-center py-8">
                  <FiAlertTriangle className="text-5xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Please login to submit fraud reports</p>
                  <a href="/login" className="btn-primary inline-block">
                    Login to Report
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-6">
                  {/* Route */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Route *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Mathura Junction to Banke Bihari Temple"
                      value={reportForm.route}
                      onChange={(e) => setReportForm({ ...reportForm, route: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  {/* Transport Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transport Type *
                    </label>
                    <select
                      value={reportForm.transportType}
                      onChange={(e) => setReportForm({ ...reportForm, transportType: e.target.value })}
                      className="input"
                      required
                    >
                      {transportTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Prices */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Charged (₹) *
                      </label>
                      <input
                        type="number"
                        placeholder="Actual price"
                        value={reportForm.actualPrice}
                        onChange={(e) => setReportForm({ ...reportForm, actualPrice: e.target.value })}
                        className="input"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fair Price (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="Expected price"
                        value={reportForm.fairPrice}
                        onChange={(e) => setReportForm({ ...reportForm, fairPrice: e.target.value })}
                        className="input"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Where did this happen?"
                      value={reportForm.location}
                      onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                      className="input"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      placeholder="Please describe what happened..."
                      value={reportForm.description}
                      onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                      className="input"
                      rows="4"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReport}
                    className="btn-primary w-full"
                  >
                    {submittingReport ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="spinner"></span>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Report'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Community Reports Tab */}
        {activeTab === 'reports' && (
          <div className="max-w-4xl mx-auto">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FiUsers className="text-krishna-600" />
                Community Reports
              </h2>

              {loadingReports ? (
                <div className="text-center py-12">
                  <div className="spinner mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading reports...</p>
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-12">
                  <FiAlertTriangle className="text-5xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No fraud reports yet. Be the first to report!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {report.route}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FiTruck className="text-krishna-600" />
                              {report.transportType}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiDollarSign className="text-red-600" />
                              Charged: ₹{report.actualPrice}
                            </span>
                            {report.fairPrice && (
                              <span className="flex items-center gap-1">
                                <FiCheckCircle className="text-green-600" />
                                Fair: ₹{report.fairPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleVote(report._id, 'upvote')}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="This happened to me too"
                          >
                            <FiThumbsUp className="text-green-600" />
                            <span className="text-xs text-gray-600 ml-1">{report.upvotes || 0}</span>
                          </button>
                          <button
                            onClick={() => handleVote(report._id, 'downvote')}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="This seems incorrect"
                          >
                            <FiThumbsDown className="text-red-600" />
                            <span className="text-xs text-gray-600 ml-1">{report.downvotes || 0}</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700">{report.description}</p>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span>Reported by {report.reportedBy?.name || 'Anonymous'}</span>
                        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <FiAlertTriangle className="text-4xl text-red-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stats?.totalReports || 0}
                </h3>
                <p className="text-gray-600">Total Reports</p>
              </div>
              
              <div className="card p-6 text-center">
                <FiUsers className="text-4xl text-krishna-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stats?.activeReporters || 0}
                </h3>
                <p className="text-gray-600">Active Reporters</p>
              </div>
              
              <div className="card p-6 text-center">
                <FiShield className="text-4xl text-green-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  ₹{stats?.totalSaved || 0}
                </h3>
                <p className="text-gray-600">Money Saved</p>
              </div>
            </div>

            <div className="card p-8 mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Community Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Together, we're creating a safer travel experience in Braj. Every report helps protect fellow devotees from fraud. Your contributions help maintain fair pricing and trustworthy services for all pilgrims. 🙏
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
