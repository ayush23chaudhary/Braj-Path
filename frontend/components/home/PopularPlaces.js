'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMapPin, FiClock, FiStar } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function PopularPlaces() {
  const [activeCity, setActiveCity] = useState('Vrindavan');

  const places = {
    Vrindavan: [
      {
        name: 'Banke Bihari Temple',
        description: 'Most famous temple of Lord Krishna in Vrindavan',
        rating: 4.9,
        reviews: 2543,
        visitTime: '2-3 hours',
        priority: 10,
        image: '🏛️',
      },
      {
        name: 'ISKCON Vrindavan',
        description: 'International Society for Krishna Consciousness temple complex',
        rating: 4.8,
        reviews: 1876,
        visitTime: '2-3 hours',
        priority: 9,
        image: '🕉️',
      },
      {
        name: 'Prem Mandir',
        description: 'Magnificent marble temple with stunning light shows',
        rating: 4.9,
        reviews: 3124,
        visitTime: '2-3 hours',
        priority: 10,
        image: '✨',
      },
      {
        name: 'Radha Raman Temple',
        description: 'Ancient temple dedicated to Radha and Krishna',
        rating: 4.7,
        reviews: 1453,
        visitTime: '1-2 hours',
        priority: 8,
        image: '🙏',
      },
    ],
    Mathura: [
      {
        name: 'Krishna Janmabhoomi',
        description: 'Birthplace of Lord Krishna',
        rating: 4.9,
        reviews: 4521,
        visitTime: '2-3 hours',
        priority: 10,
        image: '⭐',
      },
      {
        name: 'Dwarkadhish Temple',
        description: 'One of the largest temples in Mathura',
        rating: 4.7,
        reviews: 2134,
        visitTime: '1-2 hours',
        priority: 8,
        image: '🏰',
      },
      {
        name: 'Vishram Ghat',
        description: 'Sacred bathing ghat on the Yamuna River',
        rating: 4.6,
        reviews: 1876,
        visitTime: '1-2 hours',
        priority: 7,
        image: '🌊',
      },
    ],
  };

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading mb-4">Popular Sacred Places</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most revered temples and ghats in Mathura and Vrindavan
          </p>
        </div>

        {/* City Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {['Vrindavan', 'Mathura'].map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeCity === city
                    ? 'bg-white text-krishna-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {places[activeCity].map((place, index) => (
            <div
              key={index}
              className="card group cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-krishna-100 to-radha-100 rounded-xl mb-4 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {place.image}
              </div>

              {/* Priority Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="badge bg-saffron-100 text-saffron-800">
                  Priority: {place.priority}/10
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <FiClock className="text-krishna-500" />
                  <span>{place.visitTime}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-krishna-600 transition-colors">
                {place.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{place.description}</p>

              {/* Rating */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <FiStar className="text-saffron-500 fill-saffron-500" />
                  <span className="font-semibold text-gray-800">{place.rating}</span>
                  <span className="text-sm text-gray-500">({place.reviews.toLocaleString()})</span>
                </div>
                <GiTempleGate className="text-krishna-300 text-xl group-hover:text-krishna-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/places" className="btn-primary inline-flex items-center space-x-2">
            <GiTempleGate />
            <span>Explore All Temples</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
