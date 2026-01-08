# BrajPath Frontend

> Smart Trip Planner for Mathura & Vrindavan - Frontend Application

A beautiful, responsive Next.js application with Krishna-Radha themed UI for planning spiritual journeys to Mathura and Vrindavan.

## 🎨 Features

- **Krishna-Radha Theme**: Custom Tailwind CSS theme with divine colors
- **Smart Trip Planning**: AI-powered itinerary generation
- **Temple Discovery**: Browse and search sacred places
- **Hotel Search**: Find verified accommodations
- **Price Protection**: Check fair prices and report fraud
- **Interactive Maps**: Mapbox integration for route visualization
- **Responsive Design**: Works perfectly on all devices
- **Authentication**: Secure JWT-based user authentication

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom Krishna-Radha theme
- **State Management**: Zustand
- **API Client**: Axios
- **Maps**: Mapbox GL JS & React Map GL
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites

- Node.js 14+ installed
- Backend server running (see `/backend` folder)
- Mapbox account for map features

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Configure Environment

Create a `.env.local` file in the `frontend` directory:

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Mapbox Token (Get from: https://account.mapbox.com/access-tokens/)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# App Config
NEXT_PUBLIC_APP_NAME=BrajPath
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will start on `http://localhost:3001`

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js 14 App Router
│   ├── layout.js            # Root layout with providers
│   ├── page.js              # Home page
│   ├── globals.css          # Global styles
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── trip-planner/        # Trip planning interface
│   ├── places/              # Temple discovery
│   ├── hotels/              # Hotel search
│   ├── fraud-check/         # Price checking
│   ├── my-trips/            # User's trips
│   └── profile/             # User profile
│
├── components/              # Reusable components
│   ├── layout/             # Layout components
│   │   ├── Header.js       # Navigation header
│   │   └── Footer.js       # Site footer
│   ├── home/               # Home page sections
│   ├── auth/               # Authentication forms
│   ├── trip/               # Trip planning components
│   ├── places/             # Place/temple components
│   ├── hotels/             # Hotel components
│   └── common/             # Shared UI components
│
├── context/                 # React Context
│   └── AuthContext.js      # Authentication context
│
├── services/                # API services
│   └── api.js              # Axios instance & API calls
│
├── lib/                     # Utilities
│   ├── utils.js            # Helper functions
│   └── constants.js        # App constants
│
├── public/                  # Static assets
│   └── images/             # Images and icons
│
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json            # Dependencies
```

## 🎨 Theme Colors

### Krishna Blue
- Primary: `#1E40AF` (krishna-800)
- Light: `#3B82F6` (krishna-500)
- Usage: Primary buttons, headers, navigation

### Radha Pink
- Primary: `#EC4899` (radha-500)
- Dark: `#DB2777` (radha-600)
- Usage: Secondary buttons, accents, highlights

### Saffron Orange
- Primary: `#F59E0B` (saffron-500)
- Dark: `#D97706` (saffron-600)
- Usage: Badges, warnings, spiritual elements

### Gradients
```css
.bg-gradient-krishna    /* Blue gradient */
.bg-gradient-radha      /* Pink gradient */
.bg-gradient-divine     /* Krishna -> Radha -> Saffron */
.bg-gradient-sunset     /* Saffron -> Radha -> Krishna */
```

## 🔑 Key Components

### Authentication
```jsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  // Use auth methods
}
```

### API Calls
```jsx
import { tripService, placeService } from '@/services/api';

// Plan a trip
const trip = await tripService.planTrip({
  numberOfDays: 2,
  budget: 5000,
  priority: 'temples',
  groupType: 'family'
});

// Get places
const places = await placeService.getMustVisitPlaces('Vrindavan');
```

### Utilities
```jsx
import { formatCurrency, calculateDistance, cn } from '@/lib/utils';

// Format currency
formatCurrency(5000) // ₹5,000

// Calculate distance
calculateDistance(lat1, lon1, lat2, lon2) // 2.45 km

// Merge classes
cn('btn', isActive && 'btn-active')
```

## 📱 Pages

### Home (`/`)
- Hero section with CTA
- Feature highlights
- How it works
- Popular temples
- Testimonials

### Trip Planner (`/trip-planner`)
- Budget calculator
- Preference selector
- Generated itinerary display
- Day-wise schedule
- Cost breakdown

### Temples (`/places`)
- Grid/List view
- Filter by city, type, priority
- Search functionality
- Map view
- Elderly-friendly filter

### Hotels (`/hotels`)
- Category filters (budget, mid, premium, dharamshala)
- Price range slider
- Sort options
- Nearby hotels
- Budget recommendations

### Price Check (`/fraud-check`)
- Price checker tool
- Fraud report form
- Community voting
- Fraud statistics
- Fraud-prone routes

### My Trips (`/my-trips`)
- Trip history
- Status filters (planned, ongoing, completed)
- Trip details
- Feedback submission

## 🎯 Custom CSS Classes

```css
/* Buttons */
.btn-primary          /* Krishna blue gradient button */
.btn-secondary        /* Radha pink gradient button */
.btn-outline          /* Outlined button */

/* Cards */
.card                 /* White card with shadow */
.card-gradient        /* Gradient background card */

/* Inputs */
.input                /* Styled input field */
.input-error          /* Error state input */

/* Badges */
.badge                /* Pill-shaped badge */

/* Utilities */
.container-custom     /* Max-width container */
.section              /* Section padding */
.heading              /* Gradient text heading */
.subheading           /* Section subheading */
.spiritual-glow       /* Glowing effect */
.spinner              /* Loading spinner */
```

## 🗺️ Mapbox Integration

### Setup Mapbox

1. Sign up at [mapbox.com](https://www.mapbox.com/)
2. Get your access token
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
   ```

### Usage Example
```jsx
import Map from 'react-map-gl';

function MapComponent() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 77.6737,
        latitude: 27.4924,
        zoom: 12
      }}
      style={{ width: '100%', height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    />
  );
}
```

## 🔐 Authentication Flow

1. **Register**: `/register` - Create new account
2. **Login**: `/login` - Sign in with email/password
3. **Protected Routes**: Automatically redirect to login if not authenticated
4. **Token Storage**: JWT token stored in localStorage
5. **Auto Logout**: On token expiration or 401 responses

## 📊 API Integration

The frontend connects to the backend API running on `http://localhost:3000`:

- **Auth**: `/api/auth/*`
- **Trips**: `/api/trip/*`
- **Places**: `/api/places/*`
- **Hotels**: `/api/hotels/*`
- **Transport**: `/api/transport/*`
- **Fraud**: `/api/fraud/*`

All API calls include authentication token automatically via axios interceptors.

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Deployment Options

**Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables for Production**
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_production_token
```

## 🧪 Development Tips

### Hot Reload
Next.js supports fast refresh - changes appear instantly without losing state.

### Component Development
Test components in isolation before integrating.

### Mobile Testing
Use Chrome DevTools device emulation or test on real devices.

### Performance
- Use `next/image` for optimized images
- Lazy load components with `dynamic()`
- Minimize bundle size with tree shaking

## 📝 Available Scripts

```bash
npm run dev      # Start development server (port 3001)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎉 Features Checklist

- [x] Krishna-Radha themed UI
- [x] Responsive design
- [x] Authentication system
- [x] Trip planner interface
- [x] Temple discovery
- [x] Hotel search
- [x] Price checking
- [x] Fraud reporting
- [x] Map integration ready
- [x] API integration
- [x] Error handling
- [x] Loading states
- [x] Toast notifications

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti :3001 | xargs kill -9
```

### API Connection Failed
- Ensure backend is running on port 3000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in backend

### Mapbox Not Loading
- Check `NEXT_PUBLIC_MAPBOX_TOKEN` is set
- Verify token is valid on mapbox.com
- Check browser console for errors

## 📞 Support

For issues or questions:
- Email: support@brajpath.com
- Backend Docs: See `/backend/README.md`
- API Docs: See `/backend/API_EXAMPLES.md`

## 📄 License

MIT License - See LICENSE file for details

---

**Jai Shri Krishna! 🙏 Radhe Radhe! 🌺**

Made with ❤️ for devotees by the BrajPath team
