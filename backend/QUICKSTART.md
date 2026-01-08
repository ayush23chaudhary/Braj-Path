# 🚀 BrajPath Quick Start Guide

## ⚡ Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB URI:
```env
MONGO_URI=mongodb://localhost:27017/brajpath
# or use MongoDB Atlas
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/brajpath
```

### 3. Seed Database with Sample Data
```bash
npm run seed
```

This will add:
- ✅ 9 temples and sacred places
- ✅ 7 hotels (dharamshalas to premium)
- ✅ 4 common transport routes

### 4. Start Server
```bash
npm run dev
```

Server running at: `http://localhost:5000` 🎉

---

## 🧪 Test the API

### Step 1: Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Krishna Devotee",
    "email": "devotee@example.com",
    "password": "radheradhe123"
  }'
```

**Save the token from response!**

### Step 2: Plan Your First Trip
```bash
curl -X POST http://localhost:5000/api/trip/plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "numberOfDays": 2,
    "budget": 5000,
    "priority": "temples",
    "groupType": "family",
    "city": "Vrindavan"
  }'
```

### Step 3: Get Must-Visit Temples
```bash
curl http://localhost:5000/api/places/must-visit?city=Vrindavan
```

### Step 4: Check Transport Price
```bash
curl "http://localhost:5000/api/transport/price?from=ISKCON&to=Banke%20Bihari&mode=auto"
```

---

## 📱 Sample Requests

### Get Hotels Under Budget
```bash
curl "http://localhost:5000/api/hotels?city=Vrindavan&category=budget&maxPrice=1500&verified=true"
```

### Search for a Temple
```bash
curl "http://localhost:5000/api/places/search?query=banke%20bihari"
```

### Get Nearby Places
```bash
curl "http://localhost:5000/api/places/nearby?longitude=77.7035&latitude=27.5802&maxDistance=2"
```

---

## 🎯 Next Steps

1. **Explore API Documentation** - See `README.md` for all endpoints
2. **Build Frontend** - Use Next.js with Tailwind CSS
3. **Integrate Maps** - Add Mapbox for visual trip planning
4. **Add Reviews** - Integrate user reviews and ratings
5. **Mobile App** - Create React Native version

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas
# Update MONGO_URI in .env with your cluster URL
```

### Port Already in Use
```bash
# Change PORT in .env
PORT=5001
```

### Seed Data Not Loading
```bash
# Clear existing data and reseed
npm run seed
```

---

## 📚 Key Endpoints Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Register new user |
| `/api/auth/login` | POST | No | Login user |
| `/api/trip/plan` | POST | Yes | Generate trip itinerary |
| `/api/hotels` | GET | No | Get hotels list |
| `/api/places/must-visit` | GET | No | Top priority places |
| `/api/transport/price` | GET | No | Get transport pricing |
| `/api/fraud/report` | POST | Yes | Report fraud |

---

## 🙏 Ready to Build!

You're all set! Start building the divine BrajPath experience.

**Radhe Radhe! 🕉️**
