'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { hotelService } from '@/services/api';
import { CITIES, ACCOMMODATION_PREFERENCES, BUDGET_RANGES } from '@/lib/constants';
import { formatCurrency, getCategoryColor } from '@/lib/utils';
import toast from 'react-hot-toast';
import { FiSearch, FiMapPin, FiStar, FiFilter, FiDollarSign, FiMap } from 'react-icons/fi';
import { FaHotel } from 'react-icons/fa';

// Dynamically import MapComponent to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    search: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchHotels();
  }, [filters.city, filters.category]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.city) params.city = filters.city;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const response = await hotelService.getHotels(params);
      setHotels(response.data || []);
    } catch (error) {
      toast.error('Failed to load hotels');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!filters.search.trim()) {
      fetchHotels();
      return;
    }

    setLoading(true);
    try {
      const response = await hotelService.searchHotels(filters.search);
      setHotels(response.data || []);
    } catch (error) {
      toast.error('Search failed');
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-radha rounded-full mb-6">
              <FaHotel className="text-4xl text-white" />
            </div>
            <h1 className="heading mb-4">Hotels & Accommodations</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect place to stay in Mathura and Vrindavan - from budget dharamshalas to premium hotels
            </p>
          </div>

          {/* Search and Filters */}
          <div className="card bg-white mb-8">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search hotels by name..."
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
                  <FiMapPin className="inline mr-1 text-radha-500" />
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

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiFilter className="inline mr-1 text-radha-500" />
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {ACCOMMODATION_PREFERENCES.map(pref => (
                    <option key={pref.value} value={pref.value}>{pref.label}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiDollarSign className="inline mr-1 text-radha-500" />
                  Min Price
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  placeholder="Min ₹"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  placeholder="Max ₹"
                  className="input"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Found <span className="font-bold text-radha-600">{hotels.length}</span> hotels
              </div>
              <button
                onClick={fetchHotels}
                className="btn-secondary"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Map View Toggle */}
          {!loading && hotels.length > 0 && (
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
          {showMap && !loading && hotels.length > 0 && (
            <div className="card bg-white mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FiMap className="text-2xl text-radha-600" />
                <h2 className="text-2xl font-bold text-gray-800">Hotels Map</h2>
              </div>
              <MapComponent
                markers={hotels
                  .filter(hotel => hotel.location && hotel.location.coordinates)
                  .map(hotel => ({
                    id: hotel._id,
                    position: [
                      hotel.location.coordinates[1], // latitude
                      hotel.location.coordinates[0]  // longitude
                    ],
                    title: hotel.name,
                    description: `${hotel.category} - ${formatCurrency(hotel.priceRange.min)} - ${formatCurrency(hotel.priceRange.max)}`,
                    address: hotel.address,
                    type: 'hotel'
                  }))}
                center={
                  hotels[0]?.location?.coordinates
                    ? [hotels[0].location.coordinates[1], hotels[0].location.coordinates[0]]
                    : [27.4924, 77.6737] // Default: Mathura
                }
                zoom={12}
                height="500px"
                onMarkerClick={(marker) => {
                  const hotel = hotels.find(h => h._id === marker.id);
                  if (hotel) {
                    toast.success(`🏨 ${hotel.name}`, {
                      duration: 3000,
                      icon: '🏨'
                    });
                  }
                }}
              />
            </div>
          )}

          {/* Hotels Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="spinner mx-auto" />
              <p className="text-gray-600 mt-4">Loading hotels...</p>
            </div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-12">
              <FaHotel className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No hotels found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel._id} className="card group hover:-translate-y-2 transition-all duration-300">
                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-radha-100 to-saffron-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <FaHotel className="text-6xl text-radha-400 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge ${getCategoryColor(hotel.category)}`}>
                      {hotel.category}
                    </span>
                    {hotel.localPriceBadge && (
                      <span className="badge bg-green-100 text-green-700">
                        ✓ Fair Price
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-radha-600 transition-colors">
                    {hotel.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <FiMapPin className="text-radha-500" />
                    <span>{hotel.city}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Price Range */}
                  <div className="p-3 bg-radha-50 rounded-lg mb-4">
                    <div className="text-sm text-gray-600 mb-1">Price Range (per night)</div>
                    <div className="text-2xl font-bold text-radha-700">
                      {formatCurrency(hotel.priceRange.min)} - {formatCurrency(hotel.priceRange.max)}
                    </div>
                  </div>

                  {/* Amenities */}
                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="text-xs badge bg-gray-100 text-gray-700">
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="text-xs badge bg-gray-100 text-gray-700">
                          +{hotel.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {hotel.averageRating ? (
                      <div className="flex items-center space-x-1">
                        <FiStar className="text-saffron-500 fill-saffron-500" />
                        <span className="font-semibold text-gray-800">{hotel.averageRating}</span>
                        <span className="text-sm text-gray-500">
                          ({hotel.numberOfReviews || 0})
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No reviews yet</span>
                    )}

                    {hotel.distanceFromCenter && (
                      <span className="text-sm text-gray-600">
                        {hotel.distanceFromCenter.toFixed(1)} km from center
                      </span>
                    )}
                  </div>

                  {/* Contact Info */}
                  {hotel.contactInfo?.phone && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a
                        href={`tel:${hotel.contactInfo.phone}`}
                        className="btn-outline w-full text-center"
                      >
                        📞 Call to Book
                      </a>
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
