'use client';

import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      text: 'BrajPath made our family trip to Vrindavan absolutely wonderful! The itinerary was perfect, and we saved money with their price checking feature. Highly recommended!',
      avatar: '👨',
      trip: '3 Days Family Trip',
    },
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'As a solo female traveler, I felt safe and well-guided throughout my journey. The hotel recommendations were excellent and the temple timings were spot-on!',
      avatar: '👩',
      trip: '2 Days Solo Trip',
    },
    {
      name: 'Amit Patel',
      location: 'Ahmedabad',
      rating: 5,
      text: 'The fraud protection feature saved us from overcharging by auto drivers. BrajPath is a blessing for all devotees visiting Mathura-Vrindavan!',
      avatar: '👴',
      trip: '4 Days Group Trip',
    },
    {
      name: 'Neha Gupta',
      location: 'Bangalore',
      rating: 5,
      text: 'Excellent service! The proximity-based planning helped us visit 8 temples in just 2 days without rushing. The elderly-friendly filters were perfect for my parents.',
      avatar: '👱‍♀️',
      trip: '2 Days with Parents',
    },
  ];

  return (
    <section className="section bg-gradient-to-br from-krishna-50 via-white to-radha-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading mb-4">What Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of happy devotees who've had amazing experiences with BrajPath
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card bg-white hover:shadow-divine transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-saffron-500 fill-saffron-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-krishna rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-krishna-600 font-medium mt-1">
                    {testimonial.trip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 card bg-gradient-divine text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p className="text-white/90">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.9</p>
              <p className="text-white/90">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-white/90">Fraud Reports Verified</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-white/90">Sacred Places</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
