import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function CTA() {
  return (
    <section className="section bg-gradient-to-br from-krishna-800 via-krishna-700 to-radha-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl">🕉️</div>
        <div className="absolute bottom-10 right-10 text-9xl">🪔</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">
          <GiTempleGate />
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <GiTempleGate className="text-5xl text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Divine Journey?
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join BrajPath today and experience hassle-free spiritual travel with smart planning,
            price protection, and personalized itineraries for Mathura and Vrindavan.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="bg-white text-krishna-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <FiArrowRight />
            </Link>
            <Link
              href="/trip-planner"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-krishna-700 transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>Plan a Trip</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">✅</span>
              <span className="text-white/90">100% Free to Use</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🔒</span>
              <span className="text-white/90">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">⚡</span>
              <span className="text-white/90">Instant Planning</span>
            </div>
          </div>

          {/* Spiritual Quote */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-2xl font-semibold italic text-white/95">
              "Radhe Radhe 🙏 Jai Shri Krishna"
            </p>
            <p className="text-white/80 mt-2">
              May your journey be filled with divine blessings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
