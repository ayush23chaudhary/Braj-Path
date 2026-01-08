# 🚀 BRAJPATH - QUICK REFERENCE

## URLs to Test Right Now:

```bash
# Homepage
http://localhost:3001/

# Authentication
http://localhost:3001/register         # Create account
http://localhost:3001/login            # Sign in
http://localhost:3001/forgot-password  # Reset password

# Core Features
http://localhost:3001/trip-planner     # Plan your trip (needs login)
http://localhost:3001/places           # Browse temples
http://localhost:3001/hotels           # Find hotels
http://localhost:3001/fraud-check      # Check prices & report fraud

# User Dashboard
http://localhost:3001/my-trips         # Your trips (needs login)
http://localhost:3001/profile          # Your profile (needs login)

# Legal
http://localhost:3001/terms            # Terms & conditions
http://localhost:3001/privacy          # Privacy policy
```

---

## Quick Commands:

```bash
# Start Backend
cd backend && npm run dev

# Start Frontend
cd frontend && npm run dev

# Load Sample Data
cd backend && node src/seeds/seedData.js

# View Documentation
open ALL_PAGES_COMPLETE.md
```

---

## Page Features Quick Reference:

| Page | Route | Auth Required | Key Features |
|------|-------|---------------|--------------|
| Home | `/` | No | Hero, Features, Testimonials |
| Trip Planner | `/trip-planner` | Yes | AI itinerary, Budget calc |
| Places | `/places` | No | Search, Filters, Grid view |
| Hotels | `/hotels` | No | Search, Categories, Prices |
| Fraud Check | `/fraud-check` | Partial | Price check, Report, Vote |
| My Trips | `/my-trips` | Yes | History, Details, Share |
| Profile | `/profile` | Yes | Edit, Password, Preferences |
| Login | `/login` | No | Sign in form |
| Register | `/register` | No | Sign up form |
| Forgot Password | `/forgot-password` | No | Reset link |
| Terms | `/terms` | No | Legal terms |
| Privacy | `/privacy` | No | Privacy policy |

---

## File Locations:

```
frontend/app/
├── page.js                    ← Homepage
├── trip-planner/page.js       ← Trip Planner
├── places/page.js             ← Places
├── hotels/page.js             ← Hotels
├── fraud-check/page.js        ← Fraud Check (NEW)
├── my-trips/page.js           ← My Trips (NEW)
├── profile/page.js            ← Profile (NEW)
├── login/page.js              ← Login
├── register/page.js           ← Register
├── forgot-password/page.js    ← Forgot Password (NEW)
├── terms/page.js              ← Terms (NEW)
└── privacy/page.js            ← Privacy (NEW)
```

---

## Environment Variables:

### Backend (.env)
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/brajpath
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
NEXT_PUBLIC_APP_NAME=BrajPath
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## Theme Colors:

```css
Krishna Blue:  #1E40AF
Radha Pink:    #EC4899
Saffron:       #F59E0B
```

---

## API Endpoints:

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
POST   /api/trip/plan
GET    /api/trip/my-trips
GET    /api/place/list
GET    /api/hotel/list
POST   /api/transport/check-price
POST   /api/fraud/report
GET    /api/fraud/reports
POST   /api/fraud/vote/:id
```

---

## Status: ✅ ALL COMPLETE!

**Pages**: 12/12 (100%)  
**Files**: 75+  
**Lines**: 13,000+  

**Ready to use!** 🎉
