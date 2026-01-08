'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { tripService } from '@/services/api';
import { 
  DAYS_OPTIONS, 
  GROUP_TYPES, 
  PRIORITY_LEVELS, 
  ACCOMMODATION_PREFERENCES,
  SUCCESS_MESSAGES 
} from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import { FiCalendar, FiDollarSign, FiUsers, FiHeart, FiMapPin, FiArrowRight, FiClock, FiHome, FiMap } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

// Dynamically import MapComponent to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

export default function TripPlannerPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);

  const [formData, setFormData] = useState({
    numberOfDays: 2,
    budget: 5000,
    priority: 'temples',
    groupType: 'family',
    accommodationPreference: 'mid',
    specialRequirements: {
      elderlyFriendly: false,
      wheelchairAccessible: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to plan your trip');
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await tripService.planTrip(formData);
      setGeneratedTrip(response.data);
      toast.success(SUCCESS_MESSAGES.TRIP_PLANNED);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('trip-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to plan trip';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50 py-12">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-divine rounded-full mb-6">
              <GiTempleGate className="text-4xl text-white" />
            </div>
            <h1 className="heading mb-4">Plan Your Divine Journey</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create a personalized itinerary for Mathura and Vrindavan based on your budget,
              time, and preferences.
            </p>
          </div>

          {/* Trip Planning Form */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="card bg-white">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Number of Days */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiCalendar className="inline mr-2 text-krishna-500" />
                    Number of Days
                  </label>
                  <select
                    name="numberOfDays"
                    value={formData.numberOfDays}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    {DAYS_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2 text-krishna-500" />
                    Total Budget (₹)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    min="1000"
                    step="500"
                    className="input"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Daily budget: {formatCurrency(formData.budget / formData.numberOfDays)}
                  </p>
                </div>

                {/* Group Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiUsers className="inline mr-2 text-krishna-500" />
                    Group Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {GROUP_TYPES.map(type => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, groupType: type.value }))}
                        className={`p-3 border-2 rounded-lg transition-all ${
                          formData.groupType === type.value
                            ? 'border-krishna-500 bg-krishna-50'
                            : 'border-gray-200 hover:border-krishna-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiHeart className="inline mr-2 text-krishna-500" />
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    {PRIORITY_LEVELS.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Accommodation Preference */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <FiHome className="inline mr-2 text-krishna-500" />
                    Accommodation Preference
                  </label>
                  <div className="grid md:grid-cols-4 gap-3">
                    {ACCOMMODATION_PREFERENCES.map(pref => (
                      <button
                        key={pref.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, accommodationPreference: pref.value }))}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          formData.accommodationPreference === pref.value
                            ? 'border-krishna-500 bg-krishna-50'
                            : 'border-gray-200 hover:border-krishna-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-800 mb-1">{pref.label}</div>
                        <div className="text-xs text-gray-600">{pref.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Special Requirements
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="specialRequirements.elderlyFriendly"
                        checked={formData.specialRequirements.elderlyFriendly}
                        onChange={handleChange}
                        className="w-5 h-5 text-krishna-600 rounded focus:ring-krishna-500"
                      />
                      <span className="text-gray-700">👴 Elderly Friendly</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="specialRequirements.wheelchairAccessible"
                        checked={formData.specialRequirements.wheelchairAccessible}
                        onChange={handleChange}
                        className="w-5 h-5 text-krishna-600 rounded focus:ring-krishna-500"
                      />
                      <span className="text-gray-700">♿ Wheelchair Accessible</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="spinner border-white border-t-transparent" />
                      <span>Planning Your Trip...</span>
                    </>
                  ) : (
                    <>
                      <GiTempleGate />
                      <span>Generate Itinerary</span>
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Generated Trip Results */}
            {generatedTrip && (
              <div id="trip-results" className="mt-12">
                <div className="card bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Your Personalized Itinerary</h2>
                    <span className="badge bg-green-100 text-green-800">
                      Budget: {formatCurrency(generatedTrip.totalCost)}
                    </span>
                  </div>

                  {/* Route Map */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <FiMap className="text-2xl text-saffron-600" />
                      <h3 className="text-xl font-bold text-gray-800">Your Route</h3>
                    </div>
                    <MapComponent
                      markers={generatedTrip.itinerary.flatMap(day =>
                        day.places
                          .filter(place => place.location && place.location.coordinates)
                          .map((place, idx) => ({
                            id: `${day.day}-${idx}`,
                            position: [
                              place.location.coordinates[1], // latitude
                              place.location.coordinates[0]  // longitude
                            ],
                            title: place.placeName || place.name,
                            description: `Day ${day.day} - ${place.notes || place.type || ''}`,
                            type: 'route'
                          }))
                      )}
                      center={
                        generatedTrip.itinerary[0]?.places[0]?.location?.coordinates
                          ? [
                              generatedTrip.itinerary[0].places[0].location.coordinates[1],
                              generatedTrip.itinerary[0].places[0].location.coordinates[0]
                            ]
                          : [27.4924, 77.6737] // Default: Mathura
                      }
                      zoom={11}
                      height="400px"
                      onMarkerClick={(marker) => {
                        toast.success(`📍 ${marker.title}`, {
                          duration: 2000,
                          icon: '🗺️'
                        });
                      }}
                    />
                  </div>

                  {/* Day-wise Itinerary */}
                  {generatedTrip.itinerary.map((day, index) => (
                    <div key={index} className="mb-8 last:mb-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-divine rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">Day {day.day}</h3>
                          <p className="text-sm text-gray-600">
                            {day.places.length} places • {formatCurrency(day.estimatedCost)}
                          </p>
                        </div>
                      </div>

                      <div className="pl-16 space-y-4">
                        {day.places.map((place, placeIndex) => (
                          <div key={placeIndex} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-krishna-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {place.images && place.images.length > 0 ? (
                                  <img 
                                    src={place.images[0].url} 
                                    alt={place.placeName || place.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <GiTempleGate className="text-2xl text-krishna-600" />
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1">
                                {place.placeName || place.name}
                              </h4>
                              {place.notes && (
                                <p className="text-sm text-gray-500 mb-2">{place.notes}</p>
                              )}
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <FiClock className="mr-1" />
                                  {place.visitTime?.start || place.startTime} - {place.visitTime?.end || place.endTime}
                                </span>
                                <span className="flex items-center">
                                  <FiMapPin className="mr-1" />
                                  {place.location?.city || place.city || 'Vrindavan'}
                                </span>
                                {place.duration && (
                                  <span className="text-krishna-600">
                                    🕐 {place.duration} mins
                                  </span>
                                )}
                                {place.rating && (
                                  <span className="text-yellow-600">
                                    ⭐ {place.rating}
                                  </span>
                                )}
                                {place.entryFee > 0 && (
                                  <span className="text-green-600">
                                    💰 ₹{place.entryFee}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Budget Breakdown */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Breakdown</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="p-4 bg-krishna-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Accommodation</div>
                        <div className="text-xl font-bold text-krishna-700">
                          {formatCurrency(generatedTrip.budgetBreakdown?.accommodation || 0)}
                        </div>
                      </div>
                      <div className="p-4 bg-radha-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Food</div>
                        <div className="text-xl font-bold text-radha-700">
                          {formatCurrency(generatedTrip.budgetBreakdown?.food || 0)}
                        </div>
                      </div>
                      <div className="p-4 bg-saffron-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Transport</div>
                        <div className="text-xl font-bold text-saffron-700">
                          {formatCurrency(generatedTrip.budgetBreakdown?.transport || 0)}
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Miscellaneous</div>
                        <div className="text-xl font-bold text-purple-700">
                          {formatCurrency(generatedTrip.budgetBreakdown?.miscellaneous || 0)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Hotel */}
                  {generatedTrip.recommendedHotel && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-krishna-50 to-radha-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Recommended Hotel</h4>
                      <p className="text-gray-700">{generatedTrip.recommendedHotel.name}</p>
                      <p className="text-sm text-gray-600">{generatedTrip.recommendedHotel.category}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
