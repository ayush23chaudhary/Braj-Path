# 📡 BrajPath API Examples & Sample Responses

## 🔐 Authentication Examples

### Example 1: User Registration
**Request:**
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Radha Devotee",
  "email": "radha@brajpath.com",
  "password": "radhekrishna123",
  "phone": "9876543210",
  "preferences": {
    "groupType": "family",
    "priority": "temples",
    "budget": {
      "min": 3000,
      "max": 10000
    }
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Welcome to BrajPath! Jai Shri Krishna! 🙏",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWJjMTIzZGVmNDU2Nzg5MCIsImlhdCI6MTY5...",
    "user": {
      "id": "64abc123def456789",
      "name": "Radha Devotee",
      "email": "radha@brajpath.com",
      "role": "user"
    }
  }
}
```

### Example 2: User Login
**Request:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "radha@brajpath.com",
  "password": "radhekrishna123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful! Radhe Radhe! 🙏",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64abc123def456789",
      "name": "Radha Devotee",
      "email": "radha@brajpath.com",
      "role": "user",
      "preferences": {
        "groupType": "family",
        "priority": "temples"
      }
    }
  }
}
```

---

## 🗺️ Trip Planning Examples

### Example 1: Plan a 3-Day Family Temple Trip
**Request:**
```http
POST http://localhost:5000/api/trip/plan
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "numberOfDays": 3,
  "budget": 8000,
  "priority": "temples",
  "groupType": "family",
  "startDate": "2024-02-01",
  "city": "Vrindavan",
  "pacePreference": "moderate"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Trip planned successfully! Jai Shri Krishna! 🙏",
  "data": {
    "tripPlanId": "64xyz789abc123",
    "itinerary": [
      {
        "day": 1,
        "date": "2024-02-01T00:00:00.000Z",
        "places": [
          {
            "placeId": "64place001",
            "placeName": "Banke Bihari Temple",
            "visitTime": {
              "start": "06:00",
              "end": "07:30"
            },
            "duration": 90,
            "entryFee": 0,
            "notes": "Best visited during morning. Expect crowds, arrive early. Remove footwear before entering temples",
            "orderInDay": 1,
            "type": "temple",
            "rating": 4.8
          },
          {
            "placeId": "64place002",
            "placeName": "Radha Vallabh Temple",
            "visitTime": {
              "start": "08:15",
              "end": "09:15"
            },
            "duration": 60,
            "entryFee": 0,
            "notes": "Only temple where Radha Rani is the main deity",
            "orderInDay": 2,
            "type": "temple",
            "rating": 4.6
          },
          {
            "placeId": "64place003",
            "placeName": "ISKCON Temple",
            "visitTime": {
              "start": "10:00",
              "end": "12:00"
            },
            "duration": 120,
            "entryFee": 0,
            "notes": "Best visited during evening. Attend evening aarti for divine experience",
            "orderInDay": 3,
            "type": "temple",
            "rating": 4.9
          },
          {
            "placeId": "64place004",
            "placeName": "Prem Mandir",
            "visitTime": {
              "start": "17:00",
              "end": "18:30"
            },
            "duration": 90,
            "entryFee": 0,
            "notes": "Best visited during evening. Evening light show is mesmerizing",
            "orderInDay": 4,
            "type": "temple",
            "rating": 4.9
          }
        ],
        "accommodation": {
          "hotelId": "64hotel001",
          "hotelName": "ISKCON Guest House",
          "estimatedCost": 1200
        },
        "transportDetails": [
          {
            "from": "Vrindavan Bus Stand",
            "to": "Banke Bihari Temple",
            "mode": "auto",
            "estimatedCost": 30,
            "distance": 0.8
          }
        ],
        "dailyBudget": {
          "accommodation": 1200,
          "transport": 250,
          "food": 1050,
          "entry": 0,
          "total": 2500
        },
        "dailyDistance": 5.2,
        "tips": [
          "Start early to avoid crowds",
          "Carry water and snacks",
          "Dress modestly for temple visits",
          "Keep prasadam pocket for temple offerings",
          "Keep children close in crowded areas",
          "Remove footwear before entering temples",
          "Attend evening aarti for divine experience"
        ]
      },
      {
        "day": 2,
        "date": "2024-02-02T00:00:00.000Z",
        "places": [
          {
            "placeId": "64place005",
            "placeName": "Nidhivan",
            "visitTime": {
              "start": "08:00",
              "end": "09:15"
            },
            "duration": 75,
            "entryFee": 0,
            "notes": "Sacred grove where Lord Krishna performed Raas Leela",
            "orderInDay": 1,
            "type": "temple",
            "rating": 4.7
          },
          {
            "placeId": "64place006",
            "placeName": "Radha Raman Temple",
            "visitTime": {
              "start": "10:00",
              "end": "11:00"
            },
            "duration": 60,
            "entryFee": 0,
            "notes": "The deity self-manifested from a Shaligram Shila",
            "orderInDay": 2,
            "type": "temple",
            "rating": 4.7
          }
        ],
        "accommodation": {
          "hotelId": "64hotel001",
          "hotelName": "ISKCON Guest House",
          "estimatedCost": 1200
        },
        "dailyBudget": {
          "accommodation": 1200,
          "transport": 180,
          "food": 1050,
          "entry": 0,
          "total": 2430
        },
        "dailyDistance": 3.8,
        "tips": [
          "Start early to avoid crowds",
          "Carry water and snacks",
          "Dress modestly for temple visits",
          "Keep prasadam pocket for temple offerings"
        ]
      },
      {
        "day": 3,
        "date": "2024-02-03T00:00:00.000Z",
        "places": [
          {
            "placeId": "64place007",
            "placeName": "Krishna Janmabhoomi Temple",
            "visitTime": {
              "start": "07:00",
              "end": "08:30"
            },
            "duration": 90,
            "entryFee": 0,
            "notes": "The birthplace of Lord Krishna. Best visited during morning",
            "orderInDay": 1,
            "type": "temple",
            "rating": 4.8
          },
          {
            "placeId": "64place008",
            "placeName": "Vishram Ghat",
            "visitTime": {
              "start": "17:00",
              "end": "18:00"
            },
            "duration": 60,
            "entryFee": 0,
            "notes": "Best visited during evening. The evening Yamuna aarti is divine",
            "orderInDay": 2,
            "type": "ghat",
            "rating": 4.6
          }
        ],
        "accommodation": {
          "hotelId": "64hotel001",
          "hotelName": "ISKCON Guest House",
          "estimatedCost": 1200
        },
        "dailyBudget": {
          "accommodation": 1200,
          "transport": 320,
          "food": 1050,
          "entry": 0,
          "total": 2570
        },
        "dailyDistance": 14.5,
        "tips": [
          "Start early to avoid crowds",
          "Carry water and snacks"
        ]
      }
    ],
    "totalCost": 7500,
    "budgetUtilization": 94,
    "metadata": {
      "totalPlaces": 8,
      "averageRating": 4.75,
      "mustVisitCount": 3
    }
  }
}
```

### Example 2: Plan a Budget Solo Trip
**Request:**
```http
POST http://localhost:5000/api/trip/plan
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "numberOfDays": 2,
  "budget": 2500,
  "priority": "spiritual",
  "groupType": "solo",
  "city": "Vrindavan"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCost": 2400,
    "budgetUtilization": 96,
    "metadata": {
      "totalPlaces": 5,
      "mustVisitCount": 2
    }
  }
}
```

---

## 🏨 Hotel Examples

### Example 1: Get Budget Hotels in Vrindavan
**Request:**
```http
GET http://localhost:5000/api/hotels?city=Vrindavan&category=budget&maxPrice=1500&verified=true&sortBy=rating
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "total": 3,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "64hotel001",
      "name": "ISKCON Guest House",
      "description": "Clean and spiritual accommodation within ISKCON temple premises",
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
      "reviewCount": 850,
      "distanceFromCenter": 1.2,
      "amenities": ["wifi", "prasadam", "hot-water", "pooja-room"],
      "localPriceBadge": true,
      "tags": ["spiritual", "clean", "prasadam", "budget-friendly"]
    },
    {
      "_id": "64hotel002",
      "name": "MVT Guesthouse",
      "description": "Popular among spiritual seekers. Located in peaceful Raman Reti area",
      "location": {
        "coordinates": [77.6955, 27.5780],
        "address": "Raman Reti, Vrindavan",
        "city": "Vrindavan"
      },
      "priceRange": {
        "min": 600,
        "max": 1200,
        "currency": "INR"
      },
      "category": "budget",
      "verified": true,
      "rating": 4.3,
      "reviewCount": 620,
      "distanceFromCenter": 1.5,
      "localPriceBadge": true
    }
  ]
}
```

### Example 2: Get Budget Recommendations
**Request:**
```http
GET http://localhost:5000/api/hotels/budget-recommendation?budget=5000&numberOfDays=3&city=Vrindavan
```

**Response:**
```json
{
  "success": true,
  "recommendedBudgetPerNight": 666,
  "categories": ["dharamshala", "budget"],
  "count": 3,
  "data": [...]
}
```

---

## 🕉️ Places Examples

### Example 1: Get Must-Visit Temples
**Request:**
```http
GET http://localhost:5000/api/places/must-visit?city=Vrindavan
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64place001",
      "name": "Banke Bihari Temple",
      "description": "One of the most revered temples of Lord Krishna in Vrindavan",
      "type": "temple",
      "location": {
        "coordinates": [77.7035, 27.5802],
        "address": "Shri Bankey Bihari Rd, Gaushala, Vrindavan",
        "city": "Vrindavan"
      },
      "avgVisitTime": 90,
      "bestTime": "morning",
      "crowdLevel": "high",
      "entryFee": {
        "amount": 0,
        "currency": "INR"
      },
      "priorityScore": 10,
      "religiousSignificance": "The deity of Banke Bihari was established by Swami Haridas",
      "openingHours": {
        "opens": "07:45",
        "closes": "12:00"
      },
      "rating": 4.8,
      "reviewCount": 15000,
      "tags": ["banke-bihari", "krishna", "must-visit", "darshan"],
      "category": "spiritual",
      "accessibility": {
        "wheelchairFriendly": false,
        "elderlyFriendly": true,
        "parking": true
      },
      "facilities": ["prasadam", "drinking-water", "washroom"]
    },
    {
      "_id": "64place002",
      "name": "Prem Mandir",
      "description": "Magnificent modern temple with stunning architecture",
      "priorityScore": 10,
      "rating": 4.9
    },
    {
      "_id": "64place003",
      "name": "ISKCON Vrindavan",
      "priorityScore": 9,
      "rating": 4.9
    }
  ],
  "message": "These divine places are blessed with the presence of Radha-Krishna 🙏"
}
```

### Example 2: Search for a Temple
**Request:**
```http
GET http://localhost:5000/api/places/search?query=banke%20bihari
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "name": "Banke Bihari Temple",
      "type": "temple",
      "priorityScore": 10,
      "rating": 4.8
    }
  ]
}
```

---

## 🚗 Transport Examples

### Example 1: Check Transport Price
**Request:**
```http
GET http://localhost:5000/api/transport/price?from=ISKCON&to=Prem%20Mandir&mode=auto
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64trans001",
      "from": {
        "name": "ISKCON Temple",
        "location": {
          "coordinates": [77.6947, 27.5774]
        }
      },
      "to": {
        "name": "Prem Mandir",
        "location": {
          "coordinates": [77.6906, 27.5735]
        }
      },
      "mode": "e-rickshaw",
      "distance": 1.2,
      "duration": 8,
      "minPrice": 15,
      "maxPrice": 30,
      "recommendedPrice": 20,
      "currency": "INR",
      "verifiedCount": 200,
      "overchargeReports": 5,
      "trustScore": 98,
      "routeStatus": "trusted",
      "tips": [
        "Fixed rate available",
        "Shared rides cheaper"
      ]
    }
  ],
  "recommendation": "This route is generally safe with fair pricing"
}
```

### Example 2: Check If Price is Fair
**Request:**
```http
POST http://localhost:5000/api/transport/check-price
Content-Type: application/json

{
  "from": "ISKCON Temple",
  "to": "Prem Mandir",
  "mode": "e-rickshaw",
  "quotedPrice": 50
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "quotedPrice": 50,
    "minPrice": 15,
    "maxPrice": 30,
    "recommendedPrice": 20,
    "verdict": "❌ Overpriced! (67% higher than fair price). Strongly negotiate or find another option.",
    "isFair": false,
    "overchargePercentage": 67,
    "routeStatus": "trusted",
    "trustScore": 98,
    "tips": [
      "Fixed rate available",
      "Shared rides cheaper"
    ]
  }
}
```

### Example 3: Verify Price After Trip
**Request:**
```http
POST http://localhost:5000/api/transport/verify-price
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "transportPriceId": "64trans001",
  "actualPrice": 20,
  "wasOvercharged": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for verifying the price! This helps protect fellow travelers. 🙏",
  "data": {
    "newTrustScore": 99,
    "routeStatus": "trusted"
  }
}
```

---

## 🚨 Fraud Reporting Examples

### Example 1: Report Overpricing
**Request:**
```http
POST http://localhost:5000/api/fraud/report
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "serviceType": "transport",
  "serviceId": "64trans001",
  "fraudType": "overpricing",
  "chargedPrice": 150,
  "expectedPrice": 30,
  "description": "Auto driver refused to use meter and charged 5x the normal fare. Became aggressive when questioned. This happened near Banke Bihari Temple area at 6 PM.",
  "location": {
    "name": "Banke Bihari Temple Area",
    "coordinates": [77.7035, 27.5802]
  },
  "isAnonymous": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you for reporting! Your contribution helps protect fellow travelers. 🙏",
  "data": {
    "_id": "64fraud001",
    "userId": "64user001",
    "serviceType": "transport",
    "fraudType": "overpricing",
    "chargedPrice": 150,
    "expectedPrice": 30,
    "overchargePercentage": 400,
    "severity": "critical",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Example 2: Vote on Fraud Report
**Request:**
```http
POST http://localhost:5000/api/fraud/reports/64fraud001/vote
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "vote": "helpful"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Vote recorded. Thank you for your contribution! 🙏",
  "data": {
    "helpful": 25,
    "notHelpful": 2
  }
}
```

---

## ❌ Error Response Examples

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "numberOfDays is required",
    "budget must be at least ₹1000"
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized. Please login to access this resource."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Trip plan not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Trip planning failed: Invalid coordinates provided"
}
```

---

## 🧪 Test Scenarios

### Scenario 1: Complete User Journey
```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# 2. Login (save token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# 3. Plan trip
curl -X POST http://localhost:5000/api/trip/plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"numberOfDays":2,"budget":5000,"priority":"temples","groupType":"solo"}'

# 4. Check transport prices
curl "http://localhost:5000/api/transport/price?from=ISKCON&to=Banke%20Bihari"

# 5. Report fraud if needed
curl -X POST http://localhost:5000/api/fraud/report \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"serviceType":"transport","serviceId":"64abc","fraudType":"overpricing","chargedPrice":100,"expectedPrice":30,"description":"Overcharged significantly"}'
```

---

## 📱 Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "BrajPath API",
    "description": "Smart Trip Planner for Mathura & Vrindavan",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

---

**🙏 Radhe Radhe! Happy Testing! 🕉️**
