# 🎨 Frontend Theme Configuration

## Krishna-Radha Divine Color Palette

### Primary Colors
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Krishna's Divine Blue
        'krishna': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Main Krishna blue
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',  // Deep blue
          900: '#1E3A8A',
        },
        // Radha's Golden Glow
        'radha': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',  // Main golden
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Sacred Saffron
        'saffron': {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',  // Main saffron
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Peacock Green
        'peacock': {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',  // Main peacock
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Lotus Pink
        'lotus': {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',  // Main pink
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        // Divine White
        'divine': {
          50: '#FFFFFF',
          100: '#F9FAFB',
          200: '#F3F4F6',
          300: '#E5E7EB',
        },
      },
      fontFamily: {
        'sanskrit': ['Noto Sans Devanagari', 'sans-serif'],
        'primary': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radha-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)',
        'krishna-gradient': 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
        'divine-gradient': 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #3B82F6 100%)',
      },
      boxShadow: {
        'divine': '0 4px 20px rgba(251, 146, 60, 0.25)',
        'krishna': '0 4px 20px rgba(59, 130, 246, 0.25)',
      }
    },
  },
}
```

---

## Component Examples

### Hero Section
```jsx
<div className="bg-gradient-to-r from-radha-500 via-lotus-500 to-krishna-500 py-20">
  <div className="container mx-auto text-center">
    <h1 className="text-5xl font-bold text-white mb-4">
      🕉️ Welcome to BrajPath
    </h1>
    <p className="text-xl text-divine-100">
      Your Divine Journey Through Mathura & Vrindavan
    </p>
  </div>
</div>
```

### Temple Card
```jsx
<div className="bg-white rounded-xl shadow-divine hover:shadow-krishna transition-shadow p-6">
  <div className="flex items-center gap-3 mb-4">
    <span className="text-3xl">🛕</span>
    <h3 className="text-2xl font-bold text-krishna-800">Banke Bihari Temple</h3>
  </div>
  <p className="text-gray-600 mb-4">
    Most revered temple of Lord Krishna...
  </p>
  <div className="flex items-center justify-between">
    <span className="px-3 py-1 bg-radha-100 text-radha-700 rounded-full text-sm">
      Must Visit
    </span>
    <span className="text-krishna-600 font-semibold">⭐ 4.8</span>
  </div>
</div>
```

### Button Styles
```jsx
// Primary Krishna Button
<button className="px-6 py-3 bg-krishna-600 hover:bg-krishna-700 text-white rounded-lg transition-colors shadow-krishna">
  Plan Your Trip
</button>

// Radha Golden Button
<button className="px-6 py-3 bg-radha-500 hover:bg-radha-600 text-white rounded-lg transition-colors shadow-divine">
  View Hotels
</button>

// Saffron Outline Button
<button className="px-6 py-3 border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors">
  Learn More
</button>
```

### Alert Components
```jsx
// Success (Green - Prasadam received)
<div className="bg-peacock-50 border-l-4 border-peacock-500 p-4 rounded">
  <p className="text-peacock-800">✅ Trip planned successfully!</p>
</div>

// Warning (Saffron - Price alert)
<div className="bg-saffron-50 border-l-4 border-saffron-500 p-4 rounded">
  <p className="text-saffron-800">⚠️ Price slightly higher than expected</p>
</div>

// Info (Krishna blue)
<div className="bg-krishna-50 border-l-4 border-krishna-500 p-4 rounded">
  <p className="text-krishna-800">ℹ️ Temple opens at 6 AM</p>
</div>
```

---

## Design Principles

### 1. Spiritual Serenity
- Use soft backgrounds with divine-100 to divine-200
- Add subtle gradients for depth
- Include lotus and peacock motifs

### 2. Positive Energy
- Warm colors (radha, saffron) for CTAs
- Bright, welcoming interface
- Generous whitespace

### 3. Divine Contrast
- Krishna blue for headers and navigation
- Radha golden for highlights and accents
- White/divine colors for content areas

### 4. Cultural Elements
- Om symbol (🕉️) in branding
- Temple icons (🛕) for places
- Lotus flowers (🪷) as decorative elements
- Peacock feathers in headers

---

## Icon Set

```javascript
const icons = {
  temple: '🛕',
  om: '🕉️',
  lotus: '🪷',
  peacock: '🦚',
  prayer: '🙏',
  flute: '🎵',
  flower: '🌸',
  bell: '🔔',
  diya: '🪔',
  tulsi: '🌿'
}
```

---

## Typography

```css
/* Headers - Sanskrit feel */
h1, h2, h3 {
  font-family: 'Noto Sans Devanagari', sans-serif;
  font-weight: 700;
}

/* Body - Clean and readable */
body {
  font-family: 'Inter', system-ui, sans-serif;
}

/* Divine blessing text */
.blessing-text {
  font-family: 'Noto Sans Devanagari', sans-serif;
  font-size: 1.5rem;
  color: #F59E0B;
  text-align: center;
}
```

---

## Animations

```css
/* Gentle fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Divine glow pulse */
@keyframes divinePulse {
  0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.3); }
  50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.6); }
}

.animate-divine-pulse {
  animation: divinePulse 2s ease-in-out infinite;
}
```

---

## Responsive Design

```javascript
// Breakpoints aligned with divine proportions
const breakpoints = {
  sm: '640px',   // Mobile
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Ultra wide
}
```

---

## Sample Page Layout

```jsx
<div className="min-h-screen bg-gradient-to-b from-divine-50 to-white">
  {/* Header */}
  <header className="bg-krishna-800 text-white py-4 shadow-lg">
    <nav className="container mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🕉️</span>
        <span className="text-2xl font-bold">BrajPath</span>
      </div>
      <div className="space-x-6">
        <a href="#" className="hover:text-radha-400 transition">Places</a>
        <a href="#" className="hover:text-radha-400 transition">Hotels</a>
        <a href="#" className="hover:text-radha-400 transition">Plan Trip</a>
      </div>
    </nav>
  </header>

  {/* Main Content */}
  <main className="container mx-auto py-12">
    <div className="bg-white rounded-2xl shadow-divine p-8">
      {/* Your content here */}
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-krishna-900 text-white py-8 mt-20">
    <div className="container mx-auto text-center">
      <p className="text-radha-400 text-xl mb-2">🙏 Radhe Radhe 🙏</p>
      <p className="text-divine-300">Made with ❤️ for Braj Bhoomi</p>
    </div>
  </footer>
</div>
```

---

## 🎨 Color Usage Guidelines

| Color | Usage | Example |
|-------|-------|---------|
| Krishna Blue | Navigation, Headers, Primary Actions | Navbar, H1, Primary Buttons |
| Radha Golden | Highlights, CTAs, Success States | Featured badges, "Must Visit" tags |
| Saffron | Warnings, Alerts, Secondary Actions | Price alerts, Info boxes |
| Peacock Green | Success, Confirmations | "Booked", "Verified" badges |
| Lotus Pink | Accent, Love/Devotion themes | Heart icons, Ratings |
| Divine White | Backgrounds, Cards | Main bg, Card containers |

---

**Jai Shri Krishna! 🙏**

*May your designs radiate divine beauty* ✨
