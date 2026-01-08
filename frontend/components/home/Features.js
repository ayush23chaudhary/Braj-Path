import { FiMap, FiShield, FiHeart, FiClock, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function Features() {
  const features = [
    {
      icon: <FiMap className="text-3xl" />,
      title: 'Smart Trip Planner',
      description:
        'AI-powered itinerary generation based on your budget, time, and preferences. Get day-wise schedules optimized for the best experience.',
      color: 'from-krishna-500 to-krishna-600',
      iconBg: 'bg-krishna-100',
      iconColor: 'text-krishna-600',
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: 'Price Protection',
      description:
        'Check fair prices for hotels, transport, and services. Report fraud and help the community with verified pricing information.',
      color: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      icon: <GiTempleGate className="text-3xl" />,
      title: 'Temple Discovery',
      description:
        'Explore 50+ sacred temples and ghats with detailed information, timings, and accessibility features for elderly travelers.',
      color: 'from-saffron-500 to-saffron-600',
      iconBg: 'bg-saffron-100',
      iconColor: 'text-saffron-600',
    },
    {
      icon: <FiHeart className="text-3xl" />,
      title: 'Hotel Recommendations',
      description:
        'Find verified accommodations from budget dharamshalas to premium hotels. Filter by category, price, and distance from temples.',
      color: 'from-radha-500 to-radha-600',
      iconBg: 'bg-radha-100',
      iconColor: 'text-radha-600',
    },
    {
      icon: <FiClock className="text-3xl" />,
      title: 'Time Optimization',
      description:
        'Visit more places efficiently with proximity-based clustering and optimized routes that save time and money.',
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: 'Community Powered',
      description:
        'Benefit from real traveler reviews, fraud reports, and price verifications from our trusted community of devotees.',
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading mb-4">Why Choose BrajPath?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience hassle-free spiritual journeys with our comprehensive suite of tools
            designed specifically for Mathura and Vrindavan pilgrims.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center ${feature.iconColor} mb-6 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>

              {/* Gradient Bar */}
              <div className="mt-6 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${feature.color} rounded-full" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-divine text-white px-6 py-3 rounded-full">
            <FiTrendingUp />
            <span className="font-semibold">Join 1000+ Happy Travelers Today!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
