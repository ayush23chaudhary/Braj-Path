# BrajPath - Smart Trip Planner for Vrindavan & Mathura

BrajPath is an intelligent trip planning application designed specifically for pilgrims and tourists visiting the sacred cities of Vrindavan and Mathura in the Braj region of India.

## 🚀 Features

- **Smart Itinerary Generation**: AI-powered trip planning based on duration, budget, and preferences
- **Place Discovery**: Browse temples, ghats, heritage sites, and gardens with detailed information
- **Hotel Recommendations**: Find accommodations from dharamshalas to premium hotels
- **Interactive Maps**: Visual route planning with Leaflet maps integration
- **Fraud Detection**: Built-in safety features to protect travelers
- **Multi-language Support**: Available in English and Hindi

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Leaflet Maps
- Axios

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- RESTful APIs

## 📦 Project Structure

```
BrajPath/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js 14 app directory
│   ├── components/   # Reusable React components
│   └── public/       # Static assets
├── backend/          # Express.js backend
│   ├── src/
│   │   ├── models/   # MongoDB models
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Express middleware
│   │   └── seeds/    # Database seed scripts
│   └── server.js     # Server entry point
└── package.json      # Root package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ayush23chaudhary/Braj-Path.git
cd BrajPath
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/brajpath
JWT_SECRET=your_jwt_secret_key
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Seed the database
```bash
cd backend
node src/seeds/seedData.js
```

5. Run the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3001` to see the application.

## 📱 Key Features Explained

### Trip Planner Algorithm
Our intelligent algorithm considers:
- Available time and budget
- Place priorities and visit durations
- Geographic proximity for efficient routing
- Opening hours and optimal visit times
- Hotel locations and pricing

### Database Models
- **Place**: Temples, ghats, heritage sites, gardens
- **Hotel**: Accommodations with categories and amenities
- **User**: Authentication and profile management
- **Trip**: Saved itineraries

## 🗺️ Available Places

### Vrindavan (10 locations)
- Banke Bihari Temple
- ISKCON Vrindavan
- Prem Mandir
- Radha Vallabh Temple
- And more...

### Mathura (10 locations)
- Krishna Janmabhoomi Temple
- Dwarkadhish Temple
- Vishram Ghat
- Govardhan Hill
- And more...

## 🏨 Accommodation Options

- Dharamshalas (Budget-friendly for pilgrims)
- Budget Hotels
- Mid-range Hotels
- Premium Hotels

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Fraud detection system
- Secure API endpoints

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Ayush Chaudhary

## 🙏 Acknowledgments

- Place data and images from Wikimedia Commons
- Map integration powered by Leaflet
- Built with ❤️ for pilgrims and travelers
