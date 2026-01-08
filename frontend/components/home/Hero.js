import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-krishna-50 via-radha-50 to-saffron-50 -z-10" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-radha-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-krishna-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <GiTempleGate className="text-saffron-500 text-2xl" />
              <span className="text-sm font-semibold text-gray-700">
                Your Divine Journey Starts Here
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-divine bg-clip-text text-transparent">
                Plan Your Perfect
              </span>
              <br />
              <span className="text-gray-800">Spiritual Journey</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Experience the divine lands of <span className="font-semibold text-krishna-600">Mathura</span> and{' '}
              <span className="font-semibold text-radha-600">Vrindavan</span> with AI-powered trip planning,
              local price protection, and personalized temple itineraries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/trip-planner" className="btn-primary inline-flex items-center justify-center space-x-2 group">
                <span>Start Planning</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/places" className="btn-outline inline-flex items-center justify-center space-x-2">
                <GiTempleGate />
                <span>Explore Temples</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-krishna-600">50+</p>
                <p className="text-sm text-gray-600">Sacred Places</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-radha-600">1000+</p>
                <p className="text-sm text-gray-600">Happy Travelers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-saffron-600">100%</p>
                <p className="text-sm text-gray-600">Price Protected</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for temple image */}
              <div className="absolute inset-0 bg-gradient-to-br from-krishna-400 to-radha-400 flex items-center justify-center">
                <GiTempleGate className="text-white text-9xl opacity-20" />
              </div>
              
              {/* Floating cards */}
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-lg p-4 rounded-xl shadow-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">Live Trip Planning</span>
                </div>
                <p className="text-xs text-gray-600">500+ trips planned today</p>
              </div>

              <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-lg p-4 rounded-xl shadow-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🏛️</span>
                  <span className="font-semibold">Banke Bihari</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-saffron-500">★★★★★</span>
                  <span className="ml-2">4.9 (2.5k reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
