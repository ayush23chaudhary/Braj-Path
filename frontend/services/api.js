import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH SERVICES ====================
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    // Backend returns: { success, data: { token, user } }
    if (response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // Backend returns: { success, data: { token, user } }
    if (response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    if (response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  changePassword: async (passwords) => {
    const response = await api.put('/auth/password', passwords);
    return response.data;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ==================== TRIP SERVICES ====================
export const tripService = {
  planTrip: async (tripData) => {
    const response = await api.post('/trip/plan', tripData);
    return response.data;
  },

  getMyTrips: async (status) => {
    const params = status ? { status } : {};
    const response = await api.get('/trip/my-trips', { params });
    return response.data;
  },

  getTripById: async (tripId) => {
    const response = await api.get(`/trip/${tripId}`);
    return response.data;
  },

  updateTripStatus: async (tripId, status) => {
    const response = await api.patch(`/trip/${tripId}/status`, { status });
    return response.data;
  },

  submitFeedback: async (tripId, feedback) => {
    const response = await api.post(`/trip/${tripId}/feedback`, feedback);
    return response.data;
  },
};

// ==================== PLACE SERVICES ====================
export const placeService = {
  getPlaces: async (params = {}) => {
    const response = await api.get('/places', { params });
    return response.data;
  },

  getMustVisitPlaces: async (city) => {
    const params = city ? { city } : {};
    const response = await api.get('/places/must-visit', { params });
    return response.data;
  },

  getNearbyPlaces: async (latitude, longitude, maxDistance = 10) => {
    const response = await api.get('/places/nearby', {
      params: { latitude, longitude, maxDistance },
    });
    return response.data;
  },

  searchPlaces: async (searchTerm) => {
    const response = await api.get('/places/search', {
      params: { q: searchTerm },
    });
    return response.data;
  },

  getElderlyFriendlyPlaces: async () => {
    const response = await api.get('/places/elderly-friendly');
    return response.data;
  },

  getPlaceById: async (placeId) => {
    const response = await api.get(`/places/${placeId}`);
    return response.data;
  },
};

// ==================== HOTEL SERVICES ====================
export const hotelService = {
  getHotels: async (params = {}) => {
    const response = await api.get('/hotels', { params });
    return response.data;
  },

  getNearbyHotels: async (latitude, longitude, maxDistance = 5) => {
    const response = await api.get('/hotels/nearby', {
      params: { latitude, longitude, maxDistance },
    });
    return response.data;
  },

  searchHotels: async (searchTerm) => {
    const response = await api.get('/hotels/search', {
      params: { q: searchTerm },
    });
    return response.data;
  },

  getBudgetRecommendations: async (dailyBudget, numberOfDays) => {
    const response = await api.get('/hotels/budget-recommendations', {
      params: { dailyBudget, numberOfDays },
    });
    return response.data;
  },

  getHotelById: async (hotelId) => {
    const response = await api.get(`/hotels/${hotelId}`);
    return response.data;
  },
};

// ==================== TRANSPORT SERVICES ====================
export const transportService = {
  getTransportPrice: async (from, to, mode) => {
    const response = await api.get('/transport/price', {
      params: { from, to, mode },
    });
    return response.data;
  },

  checkPrice: async (from, to, mode, quotedPrice) => {
    const response = await api.post('/transport/check-price', {
      from,
      to,
      mode,
      quotedPrice,
    });
    return response.data;
  },

  verifyPrice: async (routeId, actualPrice) => {
    const response = await api.post(`/transport/${routeId}/verify`, {
      actualPrice,
    });
    return response.data;
  },

  getFraudProneRoutes: async () => {
    const response = await api.get('/transport/fraud-prone-routes');
    return response.data;
  },
};

// ==================== FRAUD SERVICES ====================
export const fraudService = {
  submitReport: async (reportData) => {
    // Use the simplified transport report endpoint
    const response = await api.post('/fraud/transport-report', reportData);
    return response.data;
  },

  getReports: async () => {
    // Get my reports instead of all reports (which requires admin)
    const response = await api.get('/fraud/my-reports');
    return response.data;
  },

  voteOnReport: async (reportId, voteType) => {
    // Fixed path to match backend: /fraud/reports/:id/vote
    const response = await api.post(`/fraud/reports/${reportId}/vote`, { voteType });
    return response.data;
  },

  verifyReport: async (reportId, verificationData) => {
    const response = await api.patch(`/fraud/reports/${reportId}/verify`, verificationData);
    return response.data;
  },

  getMyReports: async () => {
    const response = await api.get('/fraud/my-reports');
    return response.data;
  },

  getFraudStats: async (city) => {
    const params = city ? { city } : {};
    const response = await api.get('/fraud/stats', { params });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/fraud/stats');
    return response.data;
  }
};

export default api;
