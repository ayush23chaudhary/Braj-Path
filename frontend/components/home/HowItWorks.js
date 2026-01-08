import { FiCheckCircle } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Sign Up & Set Preferences',
      description:
        'Create your free account and tell us about your travel preferences, budget, and group type.',
      icon: '👤',
    },
    {
      number: '02',
      title: 'Plan Your Trip',
      description:
        'Enter your budget, number of days, and priorities. Our AI generates a personalized itinerary instantly.',
      icon: '🗓️',
    },
    {
      number: '03',
      title: 'Review & Customize',
      description:
        'Check your day-wise schedule, hotel options, and estimated costs. Modify as needed.',
      icon: '✏️',
    },
    {
      number: '04',
      title: 'Book & Travel',
      description:
        'Book your accommodations, follow the itinerary, and use our price checker to avoid overcharging.',
      icon: '✈️',
    },
    {
      number: '05',
      title: 'Share Feedback',
      description:
        'After your trip, share reviews and help other travelers with verified pricing information.',
      icon: '⭐',
    },
  ];

  return (
    <section className="section bg-gradient-to-br from-krishna-50 to-radha-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your divine journey in 5 simple steps. From signup to sharing your experiences,
            we guide you every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Number Circle */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-divine flex items-center justify-center text-white font-bold text-2xl shadow-divine">
                    {step.number}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 card bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    <span className="text-5xl ml-4">{step.icon}</span>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-krishna-300 to-radha-300" />
              )}
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="card bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What You Get With BrajPath
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Personalized day-wise itineraries',
                'Budget breakdown & optimization',
                'Verified hotel recommendations',
                'Real-time price checking',
                'Temple timings & details',
                'Proximity-based route planning',
                'Community fraud protection',
                'Elderly-friendly place filtering',
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FiCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
