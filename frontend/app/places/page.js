'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { placeService } from '@/services/api';
import { CITIES, PLACE_TYPES } from '@/lib/constants';
import { formatCurrency, getPriorityColor } from '@/lib/utils';
import toast from 'react-hot-toast';
import { FiSearch, FiMapPin, FiClock, FiStar, FiFilter, FiMap } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

// Dynamically import MapComponent to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    search: '',
    elderlyFriendly: false,
  });

  useEffect(() => {
    fetchPlaces();
  }, [filters.city, filters.type, filters.elderlyFriendly]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      let response;
      
      if (filters.elderlyFriendly) {
        response = await placeService.getElderlyFriendlyPlaces();
      } else if (!filters.city && !filters.type) {
        response = await placeService.getMustVisitPlaces();
      } else {
        response = await placeService.getPlaces({
          city: filters.city,
          type: filters.type,
        });
      }
      
      setPlaces(response.data || []);
    } catch (error) {
      toast.error('Failed to load places');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!filters.search.trim()) {
      fetchPlaces();
      return;
    }

    setLoading(true);
    try {
      const response = await placeService.searchPlaces(filters.search);
      setPlaces(response.data || []);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const filteredPlaces = places.filter(place => {
    if (filters.search && !place.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

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
            <h1 className="heading mb-4">Sacred Places & Temples</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the divine temples, ghats, and heritage sites of Mathura and Vrindavan
            </p>
          </div>

          {/* Search and Filters */}
          <div className="card bg-white mb-8">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search temples, ghats, heritage sites..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input pl-12"
                />
              </div>
            </form>

            <div className="grid md:grid-cols-4 gap-4">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiMapPin className="inline mr-1 text-krishna-500" />
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="input"
                >
                  <option value="">All Cities</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiFilter className="inline mr-1 text-krishna-500" />
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="input"
                >
                  <option value="">All Types</option>
                  {PLACE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Elderly Friendly */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Accessibility
                </label>
                <label className="flex items-center space-x-2 cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    checked={filters.elderlyFriendly}
                    onChange={(e) => setFilters({ ...filters, elderlyFriendly: e.target.checked })}
                    className="w-5 h-5 text-krishna-600 rounded focus:ring-krishna-500"
                  />
                  <span className="text-gray-700">👴 Elderly Friendly</span>
                </label>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="p-3 bg-krishna-50 rounded-lg w-full">
                  <div className="text-sm text-gray-600">Found</div>
                  <div className="text-2xl font-bold text-krishna-700">
                    {filteredPlaces.length} Places
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map View Toggle */}
          {!loading && filteredPlaces.length > 0 && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowMap(!showMap)}
                className="btn-secondary flex items-center space-x-2"
              >
                <FiMap />
                <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
              </button>
            </div>
          )}

          {/* Interactive Map */}
          {showMap && !loading && filteredPlaces.length > 0 && (
            <div className="card bg-white mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FiMap className="text-2xl text-krishna-600" />
                <h2 className="text-2xl font-bold text-gray-800">Locations Map</h2>
              </div>
              <MapComponent
                markers={filteredPlaces
                  .filter(place => place.location && place.location.coordinates)
                  .map(place => ({
                    id: place._id,
                    position: [
                      place.location.coordinates[1], // latitude
                      place.location.coordinates[0]  // longitude
                    ],
                    title: place.name,
                    description: place.description,
                    type: 'temple'
                  }))}
                center={
                  filteredPlaces[0]?.location?.coordinates
                    ? [filteredPlaces[0].location.coordinates[1], filteredPlaces[0].location.coordinates[0]]
                    : [27.4924, 77.6737] // Default: Mathura
                }
                zoom={12}
                height="500px"
                onMarkerClick={(marker) => {
                  const place = filteredPlaces.find(p => p._id === marker.id);
                  if (place) {
                    toast.success(`📍 ${place.name}`, {
                      duration: 3000,
                      icon: '🙏'
                    });
                  }
                }}
              />
            </div>
          )}

          {/* Places Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="spinner mx-auto" />
              <p className="text-gray-600 mt-4">Loading sacred places...</p>
            </div>
          ) : filteredPlaces.length === 0 ? (
            <div className="text-center py-12">
              <GiTempleGate className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No places found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <div key={place._id} className="card group hover:-translate-y-2 transition-all duration-300">
                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-krishna-100 to-radha-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <GiTempleGate className="text-6xl text-krishna-400 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Priority Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge ${getPriorityColor(place.priorityScore)}`}>
                      Priority: {place.priorityScore}/10
                    </span>
                    <span className="badge bg-gray-100 text-gray-700">
                      {place.type}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-krishna-600 transition-colors">
                    {place.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <FiMapPin className="text-krishna-500" />
                    <span>{place.city}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {place.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <FiClock className="mr-1 text-krishna-500" />
                        Visit Time
                      </span>
                      <span className="font-semibold text-gray-800">
                        {place.avgVisitTime || 'N/A'}
                      </span>
                    </div>

                    {place.timings && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Timings</span>
                        <span className="font-semibold text-gray-800">{place.timings}</span>
                      </div>
                    )}

                    {place.entryFee && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Entry Fee</span>
                        <span className="font-semibold text-gray-800">
                          {place.entryFee === 0 ? 'Free' : formatCurrency(place.entryFee)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Accessibility Icons */}
                  {place.accessibility && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                      {place.accessibility.wheelchairAccessible && (
                        <span className="text-xs badge bg-green-100 text-green-700">♿ Wheelchair</span>
                      )}
                      {place.accessibility.seniorFriendly && (
                        <span className="text-xs badge bg-blue-100 text-blue-700">👴 Senior Friendly</span>
                      )}
                      {place.accessibility.restrooms && (
                        <span className="text-xs badge bg-purple-100 text-purple-700">🚻 Restrooms</span>
                      )}
                      {place.accessibility.parking && (
                        <span className="text-xs badge bg-orange-100 text-orange-700">🅿️ Parking</span>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  {place.averageRating && (
                    <div className="flex items-center space-x-1 mt-4 pt-4 border-t border-gray-100">
                      <FiStar className="text-saffron-500 fill-saffron-500" />
                      <span className="font-semibold text-gray-800">{place.averageRating}</span>
                      <span className="text-sm text-gray-500">
                        ({place.numberOfReviews || 0} reviews)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
