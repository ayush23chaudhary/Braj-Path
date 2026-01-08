import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Trip Planner', href: '/trip-planner' },
      { label: 'Temples & Places', href: '/places' },
      { label: 'Hotels', href: '/hotels' },
      { label: 'Price Protection', href: '/fraud-check' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Safety Tips', href: '/safety' },
      { label: 'Community Guidelines', href: '/guidelines' },
      { label: 'Report Fraud', href: '/fraud-check' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-krishna-900 via-krishna-800 to-radha-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-12 h-12 bg-gradient-divine rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <GiTempleGate className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">BrajPath</h3>
                <p className="text-sm text-white/80">Jai Shri Krishna 🙏</p>
              </div>
            </Link>
            <p className="text-white/80 mb-4 leading-relaxed">
              Your trusted companion for spiritual journeys to Mathura and Vrindavan. Experience
              divine travels with smart planning and price protection.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FiTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FiFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-saffron-300">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-saffron-300">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-saffron-300">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-saffron-300">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <FiMapPin className="text-saffron-300 text-xl mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Visit Us</h5>
                <p className="text-white/80 text-sm">
                  Mathura-Vrindavan, Uttar Pradesh, India
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiMail className="text-saffron-300 text-xl mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Email Us</h5>
                <a
                  href="mailto:support@brajpath.com"
                  className="text-white/80 text-sm hover:text-white"
                >
                  support@brajpath.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiPhone className="text-saffron-300 text-xl mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Call Us</h5>
                <a href="tel:+911234567890" className="text-white/80 text-sm hover:text-white">
                  +91 123 456 7890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80 text-sm text-center md:text-left">
              © {currentYear} BrajPath. All rights reserved. Made with ❤️ for devotees.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-white/80 text-sm">Jai Shri Krishna 🙏</span>
              <span className="text-white/80 text-sm">Radhe Radhe 🌺</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
