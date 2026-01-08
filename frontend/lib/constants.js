// Mathura/Vrindavan coordinates and constants
export const MAP_CONFIG = {
  defaultCenter: {
    lat: 27.4924,
    lng: 77.6737,
  },
  defaultZoom: 12,
  maxZoom: 18,
  minZoom: 10,
};

// Cities
export const CITIES = ['Mathura', 'Vrindavan'];

// Place types
export const PLACE_TYPES = [
  { value: 'temple', label: 'Temple' },
  { value: 'ghat', label: 'Ghat' },
  { value: 'heritage', label: 'Heritage Site' },
  { value: 'garden', label: 'Garden' },
  { value: 'museum', label: 'Museum' },
];

// Priority levels
export const PRIORITY_LEVELS = [
  { value: 'temples', label: 'Temples & Sacred Places' },
  { value: 'heritage', label: 'Heritage & Culture' },
  { value: 'nature', label: 'Nature & Gardens' },
  { value: 'all', label: 'All Attractions' },
];

// Group types
export const GROUP_TYPES = [
  { value: 'solo', label: 'Solo', icon: '🧘' },
  { value: 'couple', label: 'Couple', icon: '💑' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { value: 'group', label: 'Group', icon: '👥' },
];

// Accommodation preferences
export const ACCOMMODATION_PREFERENCES = [
  { value: 'budget', label: 'Budget', description: 'Simple & Affordable' },
  { value: 'mid', label: 'Mid-Range', description: 'Comfortable Stay' },
  { value: 'premium', label: 'Premium', description: 'Luxury Experience' },
  { value: 'dharamshala', label: 'Dharamshala', description: 'Traditional & Spiritual' },
];

// Transport modes
export const TRANSPORT_MODES = [
  { value: 'auto', label: 'Auto Rickshaw', icon: '🛺' },
  { value: 'taxi', label: 'Taxi', icon: '🚕' },
  { value: 'bus', label: 'Bus', icon: '🚌' },
  { value: 'bike', label: 'Bike Rental', icon: '🏍️' },
];

// Trip status
export const TRIP_STATUS = {
  PLANNED: 'planned',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Fraud report types
export const FRAUD_TYPES = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'transport', label: 'Transport' },
  { value: 'guide', label: 'Guide' },
  { value: 'shop', label: 'Shop' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'other', label: 'Other' },
];

// Rating labels
export const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

// Budget ranges (in INR)
export const BUDGET_RANGES = [
  { min: 0, max: 2000, label: 'Under ₹2,000' },
  { min: 2000, max: 5000, label: '₹2,000 - ₹5,000' },
  { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
  { min: 10000, max: 20000, label: '₹10,000 - ₹20,000' },
  { min: 20000, max: 999999, label: 'Above ₹20,000' },
];

// Days options for trip planning
export const DAYS_OPTIONS = [
  { value: 1, label: '1 Day' },
  { value: 2, label: '2 Days' },
  { value: 3, label: '3 Days' },
  { value: 4, label: '4 Days' },
  { value: 5, label: '5 Days' },
  { value: 7, label: '1 Week' },
];

// Accessibility features
export const ACCESSIBILITY_FEATURES = [
  { value: 'wheelchairAccessible', label: 'Wheelchair Accessible', icon: '♿' },
  { value: 'seniorFriendly', label: 'Senior Friendly', icon: '👴' },
  { value: 'restrooms', label: 'Restrooms Available', icon: '🚻' },
  { value: 'parking', label: 'Parking Available', icon: '🅿️' },
];

// Time slots
export const TIME_SLOTS = [
  { value: 'morning', label: 'Morning (6 AM - 12 PM)', icon: '🌅' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)', icon: '☀️' },
  { value: 'evening', label: 'Evening (5 PM - 9 PM)', icon: '🌆' },
];

// Popular temples
export const POPULAR_TEMPLES = [
  'Banke Bihari Temple',
  'ISKCON Vrindavan',
  'Prem Mandir',
  'Krishna Janmabhoomi',
  'Dwarkadhish Temple',
  'Radha Raman Temple',
];

// Krishna-Radha quotes for spiritual touch
export const SPIRITUAL_QUOTES = [
  {
    quote: 'Wherever you are, be there totally.',
    author: 'Krishna',
  },
  {
    quote: 'The mind is restless and difficult to restrain, but it is subdued by practice.',
    author: 'Bhagavad Gita',
  },
  {
    quote: 'Love is the bridge between you and everything.',
    author: 'Radha',
  },
  {
    quote: 'Let your soul stand cool and composed before a million universes.',
    author: 'Krishna',
  },
];

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  AUTH_REQUIRED: 'Please login to continue.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  VALIDATION_ERROR: 'Please check your inputs and try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  TRIP_PLANNED: 'Your trip has been planned successfully! 🎉',
  REPORT_SUBMITTED: 'Thank you for reporting. Your contribution helps the community.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  FEEDBACK_SUBMITTED: 'Thank you for your feedback!',
};
