const mongoose = require('mongoose');
const Place = require('../models/Place');
const Hotel = require('../models/Hotel');
require('dotenv').config();

const vrindavanPlaces = [
  {
    name: 'Banke Bihari Temple',
    description: 'One of the most revered temples in Vrindavan, dedicated to Lord Krishna as Banke Bihari.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6608, 27.5826], address: 'Raman Reti, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bankey_Bihari_Temple_Vrindavan.jpg/800px-Bankey_Bihari_Temple_Vrindavan.jpg', caption: 'Banke Bihari Temple' }],
    openingHours: { opens: '07:45', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 60, priorityScore: 10, crowdLevel: 'high',
    religiousSignificance: 'One of the most sacred temples dedicated to Lord Krishna.',
    tags: ['must-visit', 'krishna', 'spiritual']
  },
  {
    name: 'ISKCON Temple Vrindavan',
    description: 'The Sri Krishna-Balaram Mandir built by ISKCON with stunning architecture.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6712, 27.5849], address: 'Bhaktivedanta Swami Marg, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Krishna_Balaram_Mandir_Vrindavan.jpg/800px-Krishna_Balaram_Mandir_Vrindavan.jpg', caption: 'ISKCON Temple' }],
    openingHours: { opens: '04:30', closes: '20:30' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 90, priorityScore: 9, crowdLevel: 'medium',
    religiousSignificance: 'Founded by Srila Prabhupada, major center for Krishna consciousness.',
    tags: ['iskcon', 'peaceful', 'must-visit']
  },
  {
    name: 'Prem Mandir',
    description: 'Magnificent white marble temple with stunning light show in the evening.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6695, 27.5808], address: 'Raman Reti, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Prem_Mandir_-_Vrindavan.jpg/800px-Prem_Mandir_-_Vrindavan.jpg', caption: 'Prem Mandir at Night' }],
    openingHours: { opens: '05:30', closes: '20:30' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'evening', avgVisitTime: 90, priorityScore: 10, crowdLevel: 'high',
    religiousSignificance: 'Temple represents divine love between Radha and Krishna.',
    tags: ['must-visit', 'light-show', 'architecture']
  },
  {
    name: 'Radha Damodar Temple',
    description: 'Historic temple where Srila Prabhupada resided. Contains samadhi of Jiva Goswami.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6592, 27.5813], address: 'Seva Kunj Road, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Radha_Damodar_Temple_Vrindavan.jpg/800px-Radha_Damodar_Temple_Vrindavan.jpg', caption: 'Radha Damodar Temple' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 60, priorityScore: 8, crowdLevel: 'medium',
    religiousSignificance: 'Contains rooms where Prabhupada lived.',
    tags: ['historic', 'spiritual', 'prabhupada']
  },
  {
    name: 'Madan Mohan Temple',
    description: 'One of the oldest temples of Vrindavan, located on a hill near Kali Ghat.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6567, 27.5875], address: 'Madan Mohan Ghera, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Madan_Mohan_Temple%2C_Vrindavan.jpg/800px-Madan_Mohan_Temple%2C_Vrindavan.jpg', caption: 'Madan Mohan Temple' }],
    openingHours: { opens: '05:30', closes: '20:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 45, priorityScore: 7, crowdLevel: 'low',
    religiousSignificance: 'First temple in Vrindavan, deity found by Chaitanya Mahaprabhu.',
    tags: ['historic', 'ancient', 'hilltop']
  },
  {
    name: 'Govind Dev Temple',
    description: 'One of the most opulent temples built by Raja Man Singh of Amber.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6598, 27.5798], address: 'Near Rangji Temple, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Govind_Devji_Temple_Vrindavan.jpg/800px-Govind_Devji_Temple_Vrindavan.jpg', caption: 'Govind Dev Temple' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 45, priorityScore: 7, crowdLevel: 'medium',
    religiousSignificance: 'Originally seven stories but reduced after Mughal attacks.',
    tags: ['historic', 'architectural', 'royal']
  },
  {
    name: 'Rangji Temple',
    description: 'Unique temple built in South Indian Dravidian style with tall gopuram.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6605, 27.5792], address: 'Rangji Temple Road, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Rangji_Temple_Vrindavan.jpg/800px-Rangji_Temple_Vrindavan.jpg', caption: 'Rangji Temple Gopuram' }],
    openingHours: { opens: '05:30', closes: '20:30' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 50, priorityScore: 7, crowdLevel: 'medium',
    religiousSignificance: 'Blends North and South Indian temple architecture.',
    tags: ['dravidian', 'architectural', 'vishnu']
  },
  {
    name: 'Nidhivan',
    description: 'Sacred grove where Krishna performs Raas Leela every night. Trees are bent and twisted.',
    type: 'heritage',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6588, 27.5808], address: 'Seva Kunj, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Nidhivan_Vrindavan.jpg/800px-Nidhivan_Vrindavan.jpg', caption: 'Nidhivan Forest' }],
    openingHours: { opens: '05:00', closes: '20:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'afternoon', avgVisitTime: 45, priorityScore: 9, crowdLevel: 'medium',
    religiousSignificance: 'Radha and Krishna perform Raas Leela here every night.',
    tags: ['mysterious', 'spiritual', 'must-visit']
  },
  {
    name: 'Kesi Ghat',
    description: 'Sacred ghat where Krishna killed the demon Kesi. Beautiful spot for evening aarti.',
    type: 'ghat',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6558, 27.5865], address: 'Kesi Ghat, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Keshi_Ghat_Vrindavan.jpg/800px-Keshi_Ghat_Vrindavan.jpg', caption: 'Kesi Ghat Aarti' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'evening', avgVisitTime: 60, priorityScore: 8, crowdLevel: 'medium',
    religiousSignificance: 'Where Lord Krishna killed the demon Kesi.',
    tags: ['ghat', 'aarti', 'yamuna', 'must-visit']
  },
  {
    name: 'Radha Raman Temple',
    description: 'Ancient temple with self-manifested deity of Krishna. Over 500 years old.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6602, 27.5818], address: 'Radha Raman Temple Lane, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Radha_Raman_Temple.jpg/800px-Radha_Raman_Temple.jpg', caption: 'Radha Raman Temple' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 45, priorityScore: 8, crowdLevel: 'medium',
    religiousSignificance: 'Deity self-manifested from Shaligrama Shila.',
    tags: ['ancient', 'self-manifested', 'gaudiya']
  }
];

const mathuraPlaces = [
  {
    name: 'Shri Krishna Janmabhoomi',
    description: 'The most sacred site in Mathura - the exact birthplace of Lord Krishna.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6719, 27.5046], address: 'Janmabhoomi, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Krishna_Janmabhoomi%2C_Mathura.jpg/800px-Krishna_Janmabhoomi%2C_Mathura.jpg', caption: 'Krishna Janmabhoomi' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 90, priorityScore: 10, crowdLevel: 'high',
    religiousSignificance: 'Exact birthplace of Lord Krishna in Kansa prison.',
    tags: ['must-visit', 'birthplace', 'krishna']
  },
  {
    name: 'Dwarkadhish Temple',
    description: 'One of the most famous temples in Mathura with beautiful Rajasthani architecture.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6745, 27.5050], address: 'Vishram Ghat, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Dwarkadhish_Temple_Mathura.jpg/800px-Dwarkadhish_Temple_Mathura.jpg', caption: 'Dwarkadhish Temple' }],
    openingHours: { opens: '06:30', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 60, priorityScore: 9, crowdLevel: 'high',
    religiousSignificance: 'Built in 1814, famous for swing festival during Holi.',
    tags: ['must-visit', 'architectural', 'holi']
  },
  {
    name: 'Vishram Ghat',
    description: 'Main ghat where Krishna rested after killing Kansa. Famous for evening aarti.',
    type: 'ghat',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6750, 27.5055], address: 'Vishram Ghat, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Vishram_Ghat_Mathura.jpg/800px-Vishram_Ghat_Mathura.jpg', caption: 'Vishram Ghat Aarti' }],
    openingHours: { opens: '05:00', closes: '22:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'evening', avgVisitTime: 60, priorityScore: 8, crowdLevel: 'high',
    religiousSignificance: 'Lord Krishna rested here after killing Kansa.',
    tags: ['ghat', 'aarti', 'must-visit', 'yamuna']
  },
  {
    name: 'Government Museum Mathura',
    description: 'One of the oldest museums with excellent Mathura school sculptures.',
    type: 'museum',
    category: 'cultural',
    location: { type: 'Point', coordinates: [77.6685, 27.4980], address: 'Dampier Nagar, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mathura_Museum_building.jpg/800px-Mathura_Museum_building.jpg', caption: 'Mathura Museum' }],
    openingHours: { opens: '10:30', closes: '16:30' },
    entryFee: { amount: 20, currency: 'INR' },
    bestTime: 'afternoon', avgVisitTime: 90, priorityScore: 6, crowdLevel: 'low',
    religiousSignificance: 'Houses ancient sculptures from Mathura school of art.',
    tags: ['museum', 'history', 'art']
  },
  {
    name: 'Gita Mandir',
    description: 'Beautiful temple with entire Bhagavad Gita inscribed on its pillars.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.6535, 27.4925], address: 'NH-2, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Gita_Mandir_Mathura.jpg/800px-Gita_Mandir_Mathura.jpg', caption: 'Gita Mandir' }],
    openingHours: { opens: '06:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 45, priorityScore: 7, crowdLevel: 'low',
    religiousSignificance: 'Bhagavad Gita inscribed on walls and pillars.',
    tags: ['gita', 'architectural', 'peaceful']
  },
  {
    name: 'Kusum Sarovar',
    description: 'Beautiful historical water tank surrounded by artistic pavilions near Govardhan.',
    type: 'heritage',
    category: 'historical',
    location: { type: 'Point', coordinates: [77.4627, 27.4983], address: 'Govardhan, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Kusum_Sarovar.jpg/800px-Kusum_Sarovar.jpg', caption: 'Kusum Sarovar Sunset' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'evening', avgVisitTime: 60, priorityScore: 7, crowdLevel: 'low',
    religiousSignificance: 'Where Radha and gopis collected flowers for Krishna.',
    tags: ['scenic', 'photography', 'heritage']
  },
  {
    name: 'Govardhan Hill',
    description: 'Sacred hill lifted by Lord Krishna to protect villagers from Indra.',
    type: 'heritage',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.4680, 27.4927], address: 'Govardhan, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Govardhan_Hill.jpg/800px-Govardhan_Hill.jpg', caption: 'Govardhan Hill' }],
    openingHours: { opens: '00:00', closes: '23:59' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 240, priorityScore: 10, crowdLevel: 'medium',
    religiousSignificance: 'Krishna lifted this hill for 7 days to protect Braj.',
    tags: ['must-visit', 'parikrama', 'sacred']
  },
  {
    name: 'Radha Kund',
    description: 'Sacred lake considered most sacred by Gaudiya Vaishnavas.',
    type: 'ghat',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.4640, 27.5120], address: 'Radha Kund, Govardhan', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Radha_Kund.jpg/800px-Radha_Kund.jpg', caption: 'Radha Kund' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 60, priorityScore: 9, crowdLevel: 'low',
    religiousSignificance: 'Most sacred bathing place, created by Krishna.',
    tags: ['sacred', 'bathing', 'gaudiya']
  },
  {
    name: 'Gokul',
    description: 'Village where Krishna spent his childhood with Nanda Baba and Yashoda.',
    type: 'heritage',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.7292, 27.4442], address: 'Gokul, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gokul_Mathura.jpg/800px-Gokul_Mathura.jpg', caption: 'Gokul Village' }],
    openingHours: { opens: '06:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 120, priorityScore: 8, crowdLevel: 'medium',
    religiousSignificance: 'Krishna was raised here by Yashoda and Nanda.',
    tags: ['krishna-childhood', 'pilgrimage', 'historic']
  },
  {
    name: 'Barsana',
    description: 'Hometown of Radha Rani, famous for Lathmar Holi celebration.',
    type: 'temple',
    category: 'spiritual',
    location: { type: 'Point', coordinates: [77.3756, 27.6486], address: 'Barsana, Mathura', city: 'Mathura' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Radha_Rani_Temple_Barsana.jpg/800px-Radha_Rani_Temple_Barsana.jpg', caption: 'Radha Rani Temple' }],
    openingHours: { opens: '05:00', closes: '21:00' },
    entryFee: { amount: 0, currency: 'INR' },
    bestTime: 'morning', avgVisitTime: 120, priorityScore: 9, crowdLevel: 'medium',
    religiousSignificance: 'Birthplace of Radha Rani.',
    tags: ['radha', 'holi', 'must-visit', 'hilltop']
  }
];

const vrindavanHotels = [
  {
    name: 'MVT Guest House (ISKCON)',
    description: 'Clean guest house within ISKCON temple complex. Perfect for spiritual seekers.',
    location: { type: 'Point', coordinates: [77.6712, 27.5849], address: 'Bhaktivedanta Swami Marg, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Krishna_Balaram_Mandir_Vrindavan.jpg/800px-Krishna_Balaram_Mandir_Vrindavan.jpg', caption: 'MVT Guest House' }],
    category: 'dharamshala', distanceFromCenter: 1.2,
    priceRange: { min: 1500, max: 4000 },
    amenities: ['wifi', 'ac', 'meals', 'prasadam'],
    contactInfo: { phone: '+91-565-2540021', email: 'mvt@iskconvrindavan.com' },
    rating: 4.5, reviewCount: 2500
  },
  {
    name: 'Nidhivan Sarovar Portico',
    description: 'Premium hotel with modern amenities and temple-view rooms.',
    location: { type: 'Point', coordinates: [77.6625, 27.5782], address: 'Chhatikara Road, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', caption: 'Nidhivan Sarovar' }],
    category: 'premium', distanceFromCenter: 2.0,
    priceRange: { min: 4000, max: 8000 },
    amenities: ['wifi', 'parking', 'ac', 'temple-view', 'meals'],
    contactInfo: { phone: '+91-565-2540100', email: 'reservations@sarovarhotels.com' },
    rating: 4.3, reviewCount: 1800
  },
  {
    name: 'Hotel Vrindavan Palace',
    description: 'Budget-friendly hotel with clean rooms near Banke Bihari Temple.',
    location: { type: 'Point', coordinates: [77.6605, 27.5820], address: 'Near Banke Bihari Temple, Vrindavan', city: 'Vrindavan' },
    images: [{ url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', caption: 'Vrindavan Palace' }],
    category: 'budget', distanceFromCenter: 0.3,
    priceRange: { min: 800, max: 2000 },
    amenities: ['wifi', 'ac', 'meals', 'hot-water'],
    contactInfo: { phone: '+91-565-2540555', email: 'info@vrindavanpalace.com' },
    rating: 3.8, reviewCount: 950
  }
];

const mathuraHotels = [
  {
    name: 'The Radha Ashok',
    description: 'Premium heritage-style hotel with excellent amenities near major temples.',
    location: { type: 'Point', coordinates: [77.6635, 27.4965], address: 'Masani Bypass, Mathura', city: 'Mathura' },
    images: [{ url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', caption: 'Radha Ashok' }],
    category: 'premium', distanceFromCenter: 3.5,
    priceRange: { min: 4500, max: 9000 },
    amenities: ['wifi', 'parking', 'ac', 'meals', 'pooja-room'],
    contactInfo: { phone: '+91-565-2404443', email: 'reservations@radhaashok.com' },
    rating: 4.4, reviewCount: 2000
  },
  {
    name: 'Brijwasi Royal',
    description: 'Modern hotel with rooftop restaurant and city views. Near Janmabhoomi.',
    location: { type: 'Point', coordinates: [77.6715, 27.4985], address: 'Station Road, Mathura', city: 'Mathura' },
    images: [{ url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', caption: 'Brijwasi Royal' }],
    category: 'mid', distanceFromCenter: 1.0,
    priceRange: { min: 2000, max: 4500 },
    amenities: ['wifi', 'parking', 'ac', 'meals'],
    contactInfo: { phone: '+91-565-2401234', email: 'info@brijwasiroyal.com' },
    rating: 4.1, reviewCount: 1500
  },
  {
    name: 'Hotel Sheetal Regency',
    description: 'Comfortable mid-range hotel with good vegetarian restaurant.',
    location: { type: 'Point', coordinates: [77.6680, 27.4970], address: 'Dampier Nagar, Mathura', city: 'Mathura' },
    images: [{ url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', caption: 'Sheetal Regency' }],
    category: 'mid', distanceFromCenter: 1.5,
    priceRange: { min: 1800, max: 3500 },
    amenities: ['wifi', 'ac', 'meals', 'hot-water'],
    contactInfo: { phone: '+91-565-2405678', email: 'sheetal.regency@gmail.com' },
    rating: 3.9, reviewCount: 800
  },
  {
    name: 'Abhinandan Lodging',
    description: 'Budget-friendly option for pilgrims. Basic but clean rooms.',
    location: { type: 'Point', coordinates: [77.6745, 27.5045], address: 'Near Vishram Ghat, Mathura', city: 'Mathura' },
    images: [{ url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', caption: 'Abhinandan' }],
    category: 'budget', distanceFromCenter: 0.5,
    priceRange: { min: 500, max: 1200 },
    amenities: ['hot-water'],
    contactInfo: { phone: '+91-565-2408888' },
    rating: 3.5, reviewCount: 450
  }
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brajpath';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    await Place.deleteMany({});
    await Hotel.deleteMany({});
    console.log('Cleared existing data');

    const allPlaces = [...vrindavanPlaces, ...mathuraPlaces];
    await Place.insertMany(allPlaces);
    console.log('Inserted ' + allPlaces.length + ' places');

    const allHotels = [...vrindavanHotels, ...mathuraHotels];
    await Hotel.insertMany(allHotels);
    console.log('Inserted ' + allHotels.length + ' hotels');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
