# 🕉️ BrajPath - Smart Trip Planner for Mathura & Vrindavan

<div align="center">

![BrajPath Logo](https://img.shields.io/badge/BrajPath-Radhe_Radhe-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

**A divine journey planner for the holy lands of Radha-Krishna** 🙏

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 🌟 About BrajPath

BrajPath is a comprehensive **smart trip planning application** designed specifically for pilgrims and travelers visiting the sacred cities of **Mathura and Vrindavan**. The platform combines modern technology with spiritual wisdom to create the perfect *Braj Yatra* experience.

### 🎯 Core Objectives

1. **Intelligent Trip Planning** - AI-powered itinerary generation based on budget, time, and preferences
2. **Fraud Prevention** - Community-driven price protection against overcharging
3. **Temple Discovery** - Comprehensive guide to temples, ghats, and sacred places
4. **Budget Optimization** - Smart cost estimation and budget allocation

---

## ✨ Features

### 🗺️ Trip Planner
- **Smart Itinerary Generation**
  - Day-wise schedule with time slots
  - Proximity-based place clustering
  - Budget-aware recommendations
  - Group type optimization (solo/family/elderly)
  
- **Priority-Based Filtering**
  - Temples focus
  - Spiritual experience
  - Leisure & sightseeing
  - Mixed itineraries

- **Time Optimization**
  - Visit duration estimation
  - Best visiting times
  - Crowd level consideration
  - Travel time calculation

### 🏨 Accommodation Finder
- **Hotel Categories**
  - Dharamshalas (₹300-600)
  - Budget Hotels (₹800-1500)
  - Mid-range Hotels (₹1500-3000)
  - Premium Resorts (₹4000+)

- **Smart Filters**
  - Distance from temples
  - Local price badge
  - Verified stays only
  - User ratings & reviews

### 🚗 Transport Price Protection
- **Fair Price Database**
  - Auto rickshaw rates
  - E-rickshaw pricing
  - Cab fares
  - Route-wise pricing

- **Fraud Prevention**
  - Price verification system
  - Community reporting
  - Trust score for routes
  - Overcharge alerts

### 🕉️ Place Discovery
- **Temple Information**
  - 50+ sacred places
  - Religious significance
  - Opening hours & aarti times
  - Crowd predictions
  - Entry fees & facilities

- **Accessibility Features**
  - Elderly-friendly places
  - Wheelchair access info
  - Parking availability
  - Rest areas

### 🚨 Community Protection
- **Fraud Reporting**
  - Report overpricing
  - Fake service alerts
  - Community verification
  - Credibility scores

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/brajpath.git
cd brajpath/backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/brajpath
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:3000
```

For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/brajpath?retryWrites=true&w=majority
```

### Step 4: Seed Database (Optional but Recommended)
```bash
npm run seed
```

This will populate your database with:
- 9 famous temples and places
- 7 hotels across categories
- 4 common transport routes
- Sample pricing data

### Step 5: Start Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start at `http://localhost:5000`

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require JWT token in headers:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Devotee Name",
  "email": "devotee@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to BrajPath! Jai Shri Krishna! 🙏",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "64abc123...",
      "name": "Devotee Name",
      "email": "devotee@example.com",
      "role": "user"
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "devotee@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### 🗺️ Trip Planning Endpoints

#### Plan a Trip
```http
POST /api/trip/plan
Authorization: Bearer <token>
Content-Type: application/json

{
  "numberOfDays": 3,
  "budget": 5000,
  "priority": "temples",
  "groupType": "family",
  "startDate": "2024-01-15",
  "city": "Vrindavan"
}
```

**Parameters:**
- `numberOfDays` (required): 1-30 days
- `budget` (required): Minimum ₹1000
- `priority` (required): "temples" | "leisure" | "spiritual" | "mixed"
- `groupType` (required): "solo" | "family" | "elderly" | "group" | "couple"
- `startDate` (optional): Trip start date
- `city` (optional): "Vrindavan" | "Mathura" (default: Vrindavan)

**Response:**
```json
{
  "success": true,
  "message": "Trip planned successfully! Jai Shri Krishna! 🙏",
  "data": {
    "tripPlanId": "64abc...",
    "itinerary": [
      {
        "day": 1,
        "date": "2024-01-15T00:00:00.000Z",
        "places": [
          {
            "placeId": "64def...",
            "placeName": "Banke Bihari Temple",
            "visitTime": {
              "start": "06:00",
              "end": "07:30"
            },
            "duration": 90,
            "entryFee": 0,
            "notes": "Best visited during morning. Remove footwear before entering temples"
          }
        ],
        "accommodation": {
          "hotelId": "64ghi...",
          "hotelName": "ISKCON Guest House",
          "estimatedCost": 1200
        },
        "dailyBudget": {
          "accommodation": 1200,
          "transport": 200,
          "food": 600,
          "entry": 0,
          "total": 2000
        },
        "tips": [
          "Start early to avoid crowds",
          "Carry water and snacks",
          "Dress modestly for temple visits"
        ]
      }
    ],
    "totalCost": 6000,
    "budgetUtilization": 80,
    "metadata": {
      "totalPlaces": 8,
      "averageRating": 4.7,
      "mustVisitCount": 3
    }
  }
}
```

#### Get My Trips
```http
GET /api/trip/my-trips?status=active
Authorization: Bearer <token>
```

#### Get Trip by ID
```http
GET /api/trip/:tripId
Authorization: Bearer <token>
```

#### Update Trip Status
```http
PATCH /api/trip/:tripId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

---

### 🏨 Hotel Endpoints

#### Get All Hotels
```http
GET /api/hotels?city=Vrindavan&category=budget&verified=true
```

**Query Parameters:**
- `city`: "Vrindavan" | "Mathura"
- `category`: "budget" | "mid" | "premium" | "dharamshala"
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `verified`: true | false
- `sortBy`: "price-low" | "price-high" | "rating"
- `limit`: Items per page (default: 20)
- `page`: Page number

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 5,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "64abc...",
      "name": "ISKCON Guest House",
      "description": "Clean and spiritual accommodation...",
      "location": {
        "coordinates": [77.6947, 27.5774],
        "address": "ISKCON Temple, Raman Reti, Vrindavan",
        "city": "Vrindavan"
      },
      "priceRange": {
        "min": 800,
        "max": 1500,
        "currency": "INR"
      },
      "category": "budget",
      "verified": true,
      "rating": 4.5,
      "localPriceBadge": true,
      "amenities": ["wifi", "prasadam", "hot-water"]
    }
  ]
}
```

#### Get Nearby Hotels
```http
GET /api/hotels/nearby?longitude=77.7035&latitude=27.5802&maxDistance=5
```

#### Budget Recommendations
```http
GET /api/hotels/budget-recommendation?budget=5000&numberOfDays=3&city=Vrindavan
```

---

### 🕉️ Place Endpoints

#### Get All Places
```http
GET /api/places?city=Vrindavan&type=temple&minPriority=8
```

**Query Parameters:**
- `city`: "Vrindavan" | "Mathura"
- `type`: "temple" | "ghat" | "heritage" | "garden"
- `category`: "spiritual" | "leisure" | "cultural" | "historical"
- `bestTime`: "morning" | "afternoon" | "evening" | "anytime"
- `minPriority`: 1-10 (priority score)
- `sortBy`: "priority" | "rating" | "name"

#### Get Must-Visit Places
```http
GET /api/places/must-visit?city=Vrindavan
```

Returns places with priority score ≥ 8

#### Get Nearby Places
```http
GET /api/places/nearby?longitude=77.7035&latitude=27.5802&maxDistance=5
```

#### Search Places
```http
GET /api/places/search?query=banke+bihari&city=Vrindavan
```

#### Get Elderly-Friendly Places
```http
GET /api/places/elderly-friendly?city=Vrindavan
```

---

### 🚗 Transport Endpoints

#### Get Transport Price
```http
GET /api/transport/price?from=ISKCON&to=Prem+Mandir&mode=auto
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "from": { "name": "ISKCON Temple" },
      "to": { "name": "Prem Mandir" },
      "mode": "auto",
      "distance": 1.2,
      "duration": 8,
      "minPrice": 20,
      "maxPrice": 40,
      "recommendedPrice": 30,
      "trustScore": 85,
      "routeStatus": "trusted",
      "tips": ["Ask for meter", "Negotiate before ride"]
    }
  ],
  "recommendation": "This route is generally safe with fair pricing"
}
```

#### Check Price Fairness
```http
POST /api/transport/check-price
Content-Type: application/json

{
  "from": "ISKCON Temple",
  "to": "Prem Mandir",
  "mode": "auto",
  "quotedPrice": 50
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "quotedPrice": 50,
    "minPrice": 20,
    "maxPrice": 40,
    "recommendedPrice": 30,
    "verdict": "⚠️ Slightly high (25% over fair price). Try negotiating.",
    "isFair": false,
    "overchargePercentage": 25,
    "routeStatus": "trusted",
    "trustScore": 85
  }
}
```

#### Verify Price (After Trip)
```http
POST /api/transport/verify-price
Authorization: Bearer <token>
Content-Type: application/json

{
  "transportPriceId": "64abc...",
  "actualPrice": 30,
  "wasOvercharged": false
}
```

#### Get Fraud-Prone Routes
```http
GET /api/transport/fraud-alert
```

---

### 🚨 Fraud Reporting Endpoints

#### Submit Fraud Report
```http
POST /api/fraud/report
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceType": "transport",
  "serviceId": "64abc...",
  "fraudType": "overpricing",
  "chargedPrice": 150,
  "expectedPrice": 50,
  "description": "Auto driver charged 3x the normal fare without using meter",
  "isAnonymous": false
}
```

**Fraud Types:**
- `overpricing` - Charged more than fair price
- `fake-service` - Service doesn't exist or fake
- `poor-quality` - Substandard service
- `scam` - Fraudulent activity
- `safety-issue` - Safety concerns

#### Vote on Report
```http
POST /api/fraud/reports/:reportId/vote
Authorization: Bearer <token>
Content-Type: application/json

{
  "vote": "helpful"
}
```

#### Get Fraud Statistics
```http
GET /api/fraud/stats
```

---

## 🎨 Krishna-Radha Theme Colors

BrajPath uses divine colors associated with Radha-Krishna:

```css
/* Primary Colors */
--krishna-blue: #1E40AF      /* Deep blue like Krishna's complexion */
--radha-golden: #F59E0B      /* Golden like Radha's attire */
--peacock-green: #059669     /* Peacock feather green */
--lotus-pink: #EC4899        /* Pink lotus */
--saffron: #F97316           /* Sacred saffron */
--divine-white: #F9FAFB      /* Pure white */
--sacred-orange: #EA580C     /* Temple orange */

/* Accent Colors */
--prasad-yellow: #FBBF24
--tulsi-green: #10B981
--vermillion: #DC2626
```

### Design Philosophy
- **Warm & Welcoming** - Orange and golden tones for positive energy
- **Spiritual Serenity** - Blue tones for peace and devotion
- **Natural Harmony** - Green elements for Vrindavan's gardens
- **Divine Radiance** - Light backgrounds with divine glow effects

---

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Helmet, Express Rate Limit, Mongo Sanitize

### Algorithms
- **Trip Planning:** Rule-based proximity clustering
- **Distance Calculation:** Haversine formula
- **Budget Optimization:** Percentage-based allocation
- **Time Slots:** Constraint satisfaction

### External APIs (Recommended)
- **Maps:** Mapbox GL JS / Google Maps
- **Distance:** Distance Matrix API
- **Reviews:** Google Places API (optional)

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── algorithms/
│   │   └── tripPlanner.js          # Core trip planning algorithm
│   ├── config/
│   │   └── database.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── tripController.js       # Trip planning logic
│   │   ├── hotelController.js      # Hotel management
│   │   ├── placeController.js      # Places management
│   │   ├── transportController.js  # Transport pricing
│   │   └── fraudController.js      # Fraud reporting
│   ├── middlewares/
│   │   ├── auth.js                 # JWT authentication
│   │   ├── errorHandler.js         # Global error handler
│   │   └── validator.js            # Request validation
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   ├── TripPlan.js            # Trip plan schema
│   │   ├── Place.js                # Place schema
│   │   ├── Hotel.js                # Hotel schema
│   │   ├── TransportPrice.js       # Transport price schema
│   │   └── FraudReport.js          # Fraud report schema
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── tripRoutes.js           # Trip endpoints
│   │   ├── hotelRoutes.js          # Hotel endpoints
│   │   ├── placeRoutes.js          # Place endpoints
│   │   ├── transportRoutes.js      # Transport endpoints
│   │   └── fraudRoutes.js          # Fraud endpoints
│   ├── seeds/
│   │   └── seedData.js             # Database seed script
│   ├── services/                   # Business logic services
│   ├── utils/
│   │   ├── distanceCalculator.js   # Distance utilities
│   │   ├── priceEstimator.js       # Price calculation
│   │   └── responseHelper.js       # Response formatters
│   └── server.js                   # Main server file
├── .env.example                    # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Plan Trip:**
```bash
curl -X POST http://localhost:5000/api/trip/plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"numberOfDays":2,"budget":3000,"priority":"temples","groupType":"family"}'
```

### Using Postman

1. Import the API collection
2. Set environment variable: `BASE_URL = http://localhost:5000/api`
3. After login, set `TOKEN` variable
4. All authenticated requests will use the token automatically

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt with salt rounds
- **Rate Limiting** - 100 requests per 15 minutes
- **NoSQL Injection Prevention** - Mongo sanitization
- **CORS Protection** - Configured origins
- **Helmet.js** - Security headers
- **Input Validation** - Request validation middleware

---

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create brajpath-api
heroku config:set MONGO_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Deploy to Railway
```bash
railway init
railway add
railway up
```

### Deploy to Render
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

---

## 📊 Sample API Responses

### Trip Plan Response
```json
{
  "success": true,
  "data": {
    "itinerary": [
      {
        "day": 1,
        "places": [
          {
            "placeName": "Banke Bihari Temple",
            "visitTime": { "start": "06:00", "end": "07:30" }
          },
          {
            "placeName": "ISKCON Temple",
            "visitTime": { "start": "08:15", "end": "10:15" }
          }
        ],
        "dailyBudget": {
          "accommodation": 1200,
          "transport": 150,
          "food": 600,
          "total": 1950
        }
      }
    ],
    "totalCost": 5850,
    "budgetUtilization": 78
  }
}
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Dedicated to Lord Krishna and Radha Rani
- Thanks to all devotees and pilgrims who inspire this project
- Special gratitude to ISKCON for spiritual guidance

---

## 📧 Contact

For questions, suggestions, or support:

- **Email:** support@brajpath.com
- **Website:** www.brajpath.com
- **GitHub Issues:** [Create Issue](https://github.com/yourusername/brajpath/issues)

---

<div align="center">

### 🕉️ Radhe Radhe! Jai Shri Krishna! 🙏

**Made with ❤️ and devotion for Braj Bhoomi**

</div>
