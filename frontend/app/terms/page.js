'use client';

import { useState } from 'react';
import { FiFileText, FiPrinter, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';
import Link from 'next/link';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FiFileText },
    { id: 'definitions', title: 'Definitions', icon: FiFileText },
    { id: 'services', title: 'Use of Services', icon: FiCheckCircle },
    { id: 'accounts', title: 'User Accounts', icon: FiCheckCircle },
    { id: 'content', title: 'User Content', icon: FiFileText },
    { id: 'fraud', title: 'Fraud Prevention', icon: FiCheckCircle },
    { id: 'liability', title: 'Liability', icon: FiFileText },
    { id: 'modifications', title: 'Modifications', icon: FiFileText },
    { id: 'contact', title: 'Contact Us', icon: FiFileText }
  ];

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-krishna rounded-full mb-4">
            <FiFileText className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="heading">Terms & Conditions</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Please read these terms carefully before using BrajPath
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: December 31, 2025
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-krishna text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="inline mr-2" />
                    {section.title}
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <button
                  onClick={handlePrint}
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <FiPrinter />
                  Print
                </button>
                <Link href="/privacy" className="btn-outline w-full flex items-center justify-center gap-2">
                  <FiFileText />
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card p-8 lg:p-12 space-y-12">
              {/* Introduction */}
              <section id="introduction">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    Welcome to BrajPath! These Terms and Conditions ("Terms") govern your use of the BrajPath 
                    website and mobile applications (collectively, the "Service"). By accessing or using our 
                    Service, you agree to be bound by these Terms.
                  </p>
                  <p>
                    BrajPath is a smart trip planning platform designed to help travelers visit the sacred 
                    cities of Mathura and Vrindavan. We provide itinerary planning, accommodation recommendations, 
                    price verification, and fraud prevention services.
                  </p>
                  <p>
                    If you do not agree to these Terms, please do not use our Service.
                  </p>
                </div>
              </section>

              {/* Definitions */}
              <section id="definitions">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Definitions</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>"Service"</strong> refers to the BrajPath website, mobile applications, and related services.</li>
                    <li><strong>"User"</strong> refers to any person who accesses or uses the Service.</li>
                    <li><strong>"Content"</strong> refers to text, images, reviews, trip plans, and other materials posted on the Service.</li>
                    <li><strong>"Trip Plan"</strong> refers to itineraries generated by our algorithm based on user preferences.</li>
                    <li><strong>"Fraud Report"</strong> refers to user-submitted information about overcharging or fraudulent practices.</li>
                  </ul>
                </div>
              </section>

              {/* Use of Services */}
              <section id="services">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Use of Services</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">3.1 Eligibility</h3>
                  <p>
                    You must be at least 18 years old to create an account and use our Service. By using 
                    the Service, you represent that you meet this age requirement.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">3.2 Permitted Use</h3>
                  <p>
                    You may use the Service for lawful purposes only. You agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Submit false or misleading information</li>
                    <li>Interfere with the Service's operation</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use automated systems to access the Service</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">3.3 Trip Planning</h3>
                  <p>
                    Our trip planning algorithm provides recommendations based on your preferences, budget, 
                    and other factors. While we strive for accuracy, itineraries are suggestions only and 
                    should be verified independently.
                  </p>
                </div>
              </section>

              {/* User Accounts */}
              <section id="accounts">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. User Accounts</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">4.1 Account Creation</h3>
                  <p>
                    To access certain features, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your password</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">4.2 Account Termination</h3>
                  <p>
                    We reserve the right to suspend or terminate your account if you violate these Terms 
                    or engage in fraudulent, abusive, or illegal activities.
                  </p>
                </div>
              </section>

              {/* User Content */}
              <section id="content">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. User Content</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">5.1 Content Ownership</h3>
                  <p>
                    You retain ownership of content you submit to the Service (reviews, fraud reports, etc.). 
                    However, by submitting content, you grant BrajPath a worldwide, non-exclusive, royalty-free 
                    license to use, display, and distribute your content.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">5.2 Content Guidelines</h3>
                  <p>
                    User content must not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contain false, misleading, or defamatory information</li>
                    <li>Violate privacy or intellectual property rights</li>
                    <li>Include offensive, harmful, or inappropriate material</li>
                    <li>Promote illegal activities or services</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">5.3 Content Moderation</h3>
                  <p>
                    We reserve the right to remove any content that violates these Terms or is otherwise 
                    objectionable, without prior notice.
                  </p>
                </div>
              </section>

              {/* Fraud Prevention */}
              <section id="fraud">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Fraud Prevention System</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">6.1 Fraud Reports</h3>
                  <p>
                    Users can submit fraud reports about overcharging or fraudulent practices. You agree 
                    that all reports must be truthful and based on actual experiences.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">6.2 Community Voting</h3>
                  <p>
                    Other users may vote on fraud reports. This voting system is for informational purposes 
                    only and does not constitute legal evidence.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">6.3 No Guarantee</h3>
                  <p>
                    While we work to prevent fraud, we cannot guarantee that all information is accurate 
                    or that you won't encounter fraudulent practices during your travels.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">6.4 Credibility Score</h3>
                  <p>
                    Users earn credibility scores based on their contributions. False or malicious reports 
                    may result in reduced scores and account restrictions.
                  </p>
                </div>
              </section>

              {/* Liability */}
              <section id="liability">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Limitation of Liability</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">7.1 Service Availability</h3>
                  <p>
                    We strive to maintain continuous Service availability but do not guarantee uninterrupted 
                    access. The Service may be temporarily unavailable due to maintenance, updates, or 
                    technical issues.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">7.2 Third-Party Services</h3>
                  <p>
                    BrajPath provides recommendations for hotels, transport, and other services. We are not 
                    responsible for the quality, safety, or legality of third-party services.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">7.3 Disclaimer</h3>
                  <p>
                    THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. BRAJPATH DISCLAIMS ALL 
                    WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR 
                    A PARTICULAR PURPOSE.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">7.4 Damages</h3>
                  <p>
                    BRAJPATH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR 
                    PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
                  </p>
                </div>
              </section>

              {/* Modifications */}
              <section id="modifications">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Modifications to Terms</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    We reserve the right to modify these Terms at any time. Changes will be effective 
                    immediately upon posting to the Service. Your continued use of the Service after 
                    changes constitutes acceptance of the modified Terms.
                  </p>
                  <p>
                    We encourage you to review these Terms periodically. Significant changes will be 
                    communicated via email or Service notification.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Contact Information</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    If you have questions about these Terms, please contact us:
                  </p>
                  <div className="bg-gradient-to-br from-krishna-50 to-radha-50 rounded-xl p-6 mt-4">
                    <p className="font-semibold text-gray-800 mb-2">BrajPath Support</p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> support@brajpath.com<br />
                      <strong>Phone:</strong> +91-XXXX-XXXXXX<br />
                      <strong>Address:</strong> Mathura, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </section>

              {/* Acceptance */}
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <div className="bg-gradient-divine text-white rounded-xl p-8 text-center">
                  <GiTempleGate className="text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    By using BrajPath, you acknowledge that you have read, understood, 
                    and agree to be bound by these Terms & Conditions.
                  </h3>
                  <p className="text-white text-opacity-90 mb-6">
                    Jai Shri Krishna 🙏
                  </p>
                  <Link href="/" className="btn-primary inline-block bg-white text-krishna-600 hover:bg-gray-100">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
