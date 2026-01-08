'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { tripService } from '@/services/api';
import { toast } from 'react-hot-toast';
import { 
  FiCalendar, 
  FiMapPin, 
  FiDollarSign, 
  FiUsers,
  FiClock,
  FiEdit,
  FiTrash2,
  FiShare2,
  FiDownload,
  FiStar,
  FiCheckCircle,
  FiXCircle,
  FiLoader
} from 'react-icons/fi';
import { GiTempleGate, GiIndiaGate } from 'react-icons/gi';

export default function MyTripsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, completed, cancelled
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deletingTripId, setDeletingTripId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchTrips();
  }, [isAuthenticated]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await tripService.getMyTrips();
      setTrips(response.data.trips || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching trips');
      console.error('Fetch trips error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTripStatus = (trip) => {
    const today = new Date();
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);

    if (trip.status === 'cancelled') return 'cancelled';
    if (today < startDate) return 'upcoming';
    if (today > endDate) return 'completed';
    return 'ongoing';
  };

  const filteredTrips = trips.filter((trip) => {
    if (filter === 'all') return true;
    return getTripStatus(trip) === filter;
  });

  const handleDeleteTrip = async (tripId) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      setDeletingTripId(tripId);
      await tripService.deleteTrip(tripId);
      toast.success('Trip deleted successfully');
      setTrips(trips.filter((t) => t._id !== tripId));
      if (selectedTrip?._id === tripId) {
        setShowDetails(false);
        setSelectedTrip(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting trip');
    } finally {
      setDeletingTripId(null);
    }
  };

  const handleShareTrip = (trip) => {
    const shareText = `Check out my trip to ${trip.destination}!\n\nDuration: ${trip.numberOfDays} days\nBudget: ₹${trip.budget}\n\nPlan your trip with BrajPath: ${window.location.origin}/trip-planner`;
    
    if (navigator.share) {
      navigator.share({
        title: `My ${trip.destination} Trip`,
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Trip details copied to clipboard!');
    }
  };

  const handleDownloadItinerary = (trip) => {
    // Create a simple text itinerary
    let itinerary = `${trip.destination} Trip Itinerary\n`;
    itinerary += `Duration: ${trip.numberOfDays} days\n`;
    itinerary += `Budget: ₹${trip.budget}\n`;
    itinerary += `Group Type: ${trip.groupType}\n\n`;
    
    trip.itinerary?.forEach((day, index) => {
      itinerary += `Day ${index + 1}:\n`;
      day.places?.forEach((place) => {
        itinerary += `  - ${place.name} (${place.timing})\n`;
      });
      itinerary += `\n`;
    });

    const blob = new Blob([itinerary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trip.destination}-trip-itinerary.txt`;
    a.click();
    toast.success('Itinerary downloaded!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return <FiClock />;
      case 'ongoing': return <FiLoader className="animate-spin" />;
      case 'completed': return <FiCheckCircle />;
      case 'cancelled': return <FiXCircle />;
      default: return <FiClock />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="heading">My Trips</span>
          </h1>
          <p className="text-gray-600">
            View and manage your planned trips to Braj Bhoomi
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'all', label: 'All Trips' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                filter === filterOption.id
                  ? 'bg-gradient-krishna text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filterOption.label}
              {filterOption.id !== 'all' && (
                <span className="ml-2 bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">
                  {trips.filter((t) => getTripStatus(t) === filterOption.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 ? (
          <div className="card p-12 text-center">
            <GiTempleGate className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {filter === 'all' ? 'No trips yet' : `No ${filter} trips`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Start planning your spiritual journey to Mathura and Vrindavan!'
                : `You don't have any ${filter} trips at the moment.`}
            </p>
            <a href="/trip-planner" className="btn-primary inline-block">
              Plan Your Trip
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => {
              const status = getTripStatus(trip);
              return (
                <div
                  key={trip._id}
                  className="card p-6 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedTrip(trip);
                    setShowDetails(true);
                  }}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    {trip.priority && (
                      <span className="px-3 py-1 bg-saffron-100 text-saffron-800 rounded-full text-xs font-medium">
                        {trip.priority}
                      </span>
                    )}
                  </div>

                  {/* Trip Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {trip.destination || 'Mathura & Vrindavan'}
                  </h3>

                  {/* Trip Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FiCalendar className="text-krishna-600" />
                      <span>{trip.numberOfDays} days</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FiDollarSign className="text-krishna-600" />
                      <span>₹{trip.budget?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FiUsers className="text-krishna-600" />
                      <span className="capitalize">{trip.groupType || 'Solo'}</span>
                    </div>
                    {trip.itinerary && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <GiTempleGate className="text-krishna-600" />
                        <span>{trip.itinerary.length} days planned</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareTrip(trip);
                      }}
                      className="flex-1 p-2 text-krishna-600 hover:bg-krishna-50 rounded-lg transition-colors"
                      title="Share Trip"
                    >
                      <FiShare2 className="mx-auto" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadItinerary(trip);
                      }}
                      className="flex-1 p-2 text-krishna-600 hover:bg-krishna-50 rounded-lg transition-colors"
                      title="Download Itinerary"
                    >
                      <FiDownload className="mx-auto" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrip(trip._id);
                      }}
                      disabled={deletingTripId === trip._id}
                      className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete Trip"
                    >
                      {deletingTripId === trip._id ? (
                        <div className="spinner mx-auto" style={{ width: '16px', height: '16px' }}></div>
                      ) : (
                        <FiTrash2 className="mx-auto" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Trip Details Modal */}
        {showDetails && selectedTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Trip Details
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiXCircle className="text-2xl text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                {/* Trip Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedTrip.destination || 'Mathura & Vrindavan'}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <span className="flex items-center gap-2">
                      <FiCalendar className="text-krishna-600" />
                      {selectedTrip.numberOfDays} days
                    </span>
                    <span className="flex items-center gap-2">
                      <FiDollarSign className="text-krishna-600" />
                      ₹{selectedTrip.budget?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiUsers className="text-krishna-600" />
                      {selectedTrip.groupType}
                    </span>
                  </div>
                </div>

                {/* Itinerary */}
                {selectedTrip.itinerary && selectedTrip.itinerary.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Day-wise Itinerary
                    </h4>
                    <div className="space-y-6">
                      {selectedTrip.itinerary.map((day, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4">
                          <h5 className="text-lg font-semibold text-gray-800 mb-3">
                            Day {index + 1}
                          </h5>
                          {day.places && day.places.length > 0 ? (
                            <div className="space-y-3">
                              {day.places.map((place, placeIndex) => (
                                <div key={placeIndex} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                  <GiTempleGate className="text-2xl text-krishna-600 flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                      {place.name || place}
                                    </p>
                                    {place.timing && (
                                      <p className="text-sm text-gray-600">
                                        <FiClock className="inline mr-1" />
                                        {place.timing}
                                      </p>
                                    )}
                                    {place.description && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {place.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">No places planned for this day</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hotels */}
                {selectedTrip.hotels && selectedTrip.hotels.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Recommended Hotels
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTrip.hotels.map((hotel, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4">
                          <h5 className="font-semibold text-gray-800 mb-2">
                            {hotel.name}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {hotel.city} - {hotel.category}
                          </p>
                          <p className="text-krishna-600 font-semibold">
                            ₹{hotel.priceRange?.min} - ₹{hotel.priceRange?.max} / night
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget Breakdown */}
                {selectedTrip.budgetBreakdown && (
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Budget Breakdown
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(selectedTrip.budgetBreakdown).map(([key, value]) => (
                        <div key={key} className="bg-gradient-to-br from-krishna-50 to-radha-50 p-4 rounded-xl text-center">
                          <p className="text-sm text-gray-600 capitalize mb-1">
                            {key}
                          </p>
                          <p className="text-xl font-bold text-gray-800">
                            ₹{value?.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Requirements */}
                {selectedTrip.specialRequirements && Object.keys(selectedTrip.specialRequirements).length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Special Requirements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedTrip.specialRequirements)
                        .filter(([_, value]) => value)
                        .map(([key]) => (
                          <span key={key} className="px-3 py-1 bg-saffron-100 text-saffron-800 rounded-full text-sm">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
