import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(date) {
  return new Intl.DateFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

// Format time
export function formatTime(date) {
  return new Intl.DateFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2);
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Truncate text
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Get priority badge color
export function getPriorityColor(priority) {
  if (priority >= 9) return 'bg-saffron-500 text-white';
  if (priority >= 7) return 'bg-krishna-500 text-white';
  if (priority >= 5) return 'bg-radha-500 text-white';
  return 'bg-gray-500 text-white';
}

// Get category color
export function getCategoryColor(category) {
  const colors = {
    budget: 'bg-green-100 text-green-800',
    mid: 'bg-blue-100 text-blue-800',
    premium: 'bg-purple-100 text-purple-800',
    luxury: 'bg-yellow-100 text-yellow-800',
    dharamshala: 'bg-saffron-100 text-saffron-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
}

// Get status color
export function getStatusColor(status) {
  const colors = {
    planned: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

// Validate email
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone
export function isValidPhone(phone) {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
}

// Generate random color
export function getRandomColor() {
  const colors = [
    'bg-krishna-500',
    'bg-radha-500',
    'bg-saffron-500',
    'bg-spiritual-peacock',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Group array by key
export function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

// Calculate percentage
export function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
}

// Get initials from name
export function getInitials(name) {
  if (!name) return '?';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

// Sleep function
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
