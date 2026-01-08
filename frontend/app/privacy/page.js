'use client';

import { useState } from 'react';
import { FiShield, FiPrinter, FiLock, FiEye, FiDatabase, FiUsers } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';
import Link from 'next/link';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FiShield },
    { id: 'collection', title: 'Information We Collect', icon: FiDatabase },
    { id: 'usage', title: 'How We Use Information', icon: FiEye },
    { id: 'sharing', title: 'Information Sharing', icon: FiUsers },
    { id: 'security', title: 'Data Security', icon: FiLock },
    { id: 'cookies', title: 'Cookies & Tracking', icon: FiDatabase },
    { id: 'rights', title: 'Your Rights', icon: FiShield },
    { id: 'children', title: "Children's Privacy", icon: FiShield },
    { id: 'changes', title: 'Policy Changes', icon: FiShield },
    { id: 'contact', title: 'Contact Us', icon: FiShield }
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-radha rounded-full mb-4">
            <FiShield className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="heading">Privacy Policy</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Your privacy is important to us. Learn how we protect your data.
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
                        ? 'bg-gradient-radha text-white'
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
                <Link href="/terms" className="btn-outline w-full flex items-center justify-center gap-2">
                  <FiShield />
                  Terms & Conditions
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
                    Welcome to BrajPath's Privacy Policy. This policy describes how BrajPath ("we", "us", or "our") 
                    collects, uses, and protects your personal information when you use our website and mobile 
                    applications (collectively, the "Service").
                  </p>
                  <p>
                    We are committed to protecting your privacy and ensuring the security of your personal data. 
                    By using BrajPath, you consent to the data practices described in this policy.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm">
                      <strong>🔒 Your Privacy Matters:</strong> We will never sell your personal information 
                      to third parties. Your data is used solely to provide and improve our Service.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Collection */}
              <section id="collection">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">2.1 Information You Provide</h3>
                  <p>
                    When you use BrajPath, you may provide us with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
                    <li><strong>Profile Information:</strong> Dietary preferences, interests, travel preferences</li>
                    <li><strong>Trip Plans:</strong> Destination, budget, group type, special requirements</li>
                    <li><strong>Fraud Reports:</strong> Route information, transport details, descriptions, locations</li>
                    <li><strong>Reviews & Feedback:</strong> Ratings, comments, experiences</li>
                    <li><strong>Payment Information:</strong> Transaction details (processed securely by third-party providers)</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">2.2 Automatically Collected Information</h3>
                  <p>
                    We automatically collect certain information when you use our Service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                    <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on Service</li>
                    <li><strong>Location Data:</strong> Approximate location based on IP address (with your consent)</li>
                    <li><strong>Cookies & Similar Technologies:</strong> See section 6 for details</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">2.3 Information from Third Parties</h3>
                  <p>
                    We may receive information from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Social media platforms (if you choose to connect your account)</li>
                    <li>Payment processors (transaction confirmation)</li>
                    <li>Analytics providers (usage statistics)</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Information */}
              <section id="usage">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    We use your information to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Provide Services:</strong> Generate trip itineraries, recommend hotels, verify prices</li>
                    <li><strong>Account Management:</strong> Create and maintain your account, authenticate access</li>
                    <li><strong>Communication:</strong> Send confirmations, updates, support responses, newsletters</li>
                    <li><strong>Fraud Prevention:</strong> Process fraud reports, maintain community safety</li>
                    <li><strong>Improvement:</strong> Analyze usage patterns, improve features, develop new services</li>
                    <li><strong>Legal Compliance:</strong> Comply with laws, enforce our Terms, protect our rights</li>
                    <li><strong>Marketing:</strong> Send promotional offers (you can opt out anytime)</li>
                  </ul>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-4">
                    <p className="text-sm">
                      <strong>✅ Your Control:</strong> You can manage your communication preferences in your 
                      account settings. You can opt out of marketing emails at any time.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section id="sharing">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Information Sharing</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">4.1 We Share Information With:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Service Providers:</strong> Third parties who help us operate the Service 
                      (hosting, analytics, payment processing, email delivery)
                    </li>
                    <li>
                      <strong>Business Partners:</strong> Hotels, transport providers (only information 
                      necessary for bookings)
                    </li>
                    <li>
                      <strong>Community Members:</strong> Fraud reports and reviews are visible to other users 
                      (your name and credibility score may be displayed)
                    </li>
                    <li>
                      <strong>Legal Authorities:</strong> When required by law or to protect rights and safety
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">4.2 We Do NOT:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Sell your personal information to third parties</li>
                    <li>Share your information for third-party marketing without consent</li>
                    <li>Disclose sensitive information unnecessarily</li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section id="security">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Data Security</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Encryption:</strong> SSL/TLS encryption for data in transit</li>
                    <li><strong>Password Security:</strong> Bcrypt hashing for stored passwords</li>
                    <li><strong>Access Control:</strong> Limited employee access to personal data</li>
                    <li><strong>Secure Servers:</strong> Protected infrastructure with regular security updates</li>
                    <li><strong>Monitoring:</strong> Continuous monitoring for security threats</li>
                  </ul>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
                    <p className="text-sm">
                      <strong>⚠️ Important:</strong> No system is 100% secure. While we implement strong 
                      security measures, we cannot guarantee absolute security. Please use strong passwords 
                      and keep your account credentials confidential.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies & Tracking */}
              <section id="cookies">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies & Tracking Technologies</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">6.1 What Are Cookies?</h3>
                  <p>
                    Cookies are small text files stored on your device that help us recognize you and 
                    remember your preferences.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">6.2 Types of Cookies We Use:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for Service functionality (authentication, security)</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how users interact with the Service</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Analytics Cookies:</strong> Collect anonymous usage data (Google Analytics)</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4">6.3 Managing Cookies:</h3>
                  <p>
                    You can control cookies through your browser settings. However, disabling cookies may 
                    limit your ability to use certain features.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section id="rights">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Privacy Rights</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                    <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                    <li><strong>Object:</strong> Object to processing of your data for certain purposes</li>
                  </ul>

                  <p className="mt-4">
                    To exercise these rights, please contact us at <a href="mailto:privacy@brajpath.com" className="text-krishna-600 hover:underline">privacy@brajpath.com</a>
                  </p>
                </div>
              </section>

              {/* Children's Privacy */}
              <section id="children">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Children's Privacy</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    BrajPath is not intended for children under 18 years of age. We do not knowingly 
                    collect personal information from children. If you are a parent or guardian and 
                    believe your child has provided us with personal information, please contact us 
                    immediately.
                  </p>
                  <p>
                    If we discover we have collected information from a child under 18, we will delete 
                    that information promptly.
                  </p>
                </div>
              </section>

              {/* Policy Changes */}
              <section id="changes">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to This Policy</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices 
                    or legal requirements. We will notify you of significant changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Posting the updated policy on our website</li>
                    <li>Updating the "Last Updated" date</li>
                    <li>Sending email notifications for material changes</li>
                  </ul>
                  <p>
                    Your continued use of the Service after changes constitutes acceptance of the updated policy.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Us</h2>
                <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
                  <p>
                    If you have questions or concerns about this Privacy Policy or our data practices, 
                    please contact us:
                  </p>
                  <div className="bg-gradient-to-br from-krishna-50 to-radha-50 rounded-xl p-6 mt-4">
                    <p className="font-semibold text-gray-800 mb-4">BrajPath Privacy Team</p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> privacy@brajpath.com</p>
                      <p><strong>Support:</strong> support@brajpath.com</p>
                      <p><strong>Phone:</strong> +91-XXXX-XXXXXX</p>
                      <p><strong>Address:</strong> Mathura, Uttar Pradesh, India</p>
                    </div>
                  </div>

                  <p className="mt-4">
                    We will respond to your inquiry within 30 days.
                  </p>
                </div>
              </section>

              {/* Trust Statement */}
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <div className="bg-gradient-divine text-white rounded-xl p-8 text-center">
                  <FiShield className="text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    Your Trust is Our Priority
                  </h3>
                  <p className="text-white text-opacity-90 mb-6">
                    We are committed to protecting your privacy and handling your data responsibly. 
                    Your trust enables us to serve the BrajPath community better.
                  </p>
                  <p className="text-white text-opacity-90 mb-6">
                    Jai Shri Krishna 🙏
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/profile" className="btn-primary inline-block bg-white text-krishna-600 hover:bg-gray-100">
                      Manage Privacy Settings
                    </Link>
                    <Link href="/" className="btn-outline inline-block border-white text-white hover:bg-white hover:text-krishna-600">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>

              {/* Compliance Badges */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <FiLock className="text-3xl text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">SSL Encrypted</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <FiShield className="text-3xl text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Data Protected</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <FiDatabase className="text-3xl text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Secure Storage</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <FiUsers className="text-3xl text-radha-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Privacy First</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
