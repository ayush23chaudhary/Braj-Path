'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiMap, FiHeart, FiShield } from 'react-icons/fi';
import { GiTempleGate } from 'react-icons/gi';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home', icon: null },
    { href: '/trip-planner', label: 'Plan Trip', icon: <FiMap /> },
    { href: '/places', label: 'Temples', icon: <GiTempleGate /> },
    { href: '/hotels', label: 'Hotels', icon: <FiHeart /> },
    { href: '/fraud-check', label: 'Price Check', icon: <FiShield /> },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-md">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-divine rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <GiTempleGate className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-divine bg-clip-text text-transparent">
                BrajPath
              </h1>
              <p className="text-xs text-gray-600">Jai Shri Krishna 🙏</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 font-medium transition-colors link-hover ${
                  isActive(link.href)
                    ? 'text-krishna-600'
                    : 'text-gray-700 hover:text-krishna-600'
                }`}
              >
                {link.icon && <span className="text-lg">{link.icon}</span>}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 bg-gradient-krishna text-white px-4 py-2 rounded-lg hover:shadow-krishna transition-all"
                >
                  <FiUser />
                  <span>{user?.name?.split(' ')[0]}</span>
                </button>

                {/* Profile Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-krishna-50 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <FiUser className="inline mr-2" />
                      My Profile
                    </Link>
                    <Link
                      href="/my-trips"
                      className="block px-4 py-2 text-gray-700 hover:bg-krishna-50 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <FiMap className="inline mr-2" />
                      My Trips
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-krishna-600 font-medium hover:text-krishna-700 transition-colors"
                >
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-krishna-600 transition-colors"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'bg-krishna-50 text-krishna-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon && <span className="text-lg">{link.icon}</span>}
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4 px-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block py-2 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/my-trips"
                      className="block py-2 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Trips
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block py-2 text-krishna-600 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block mt-2 btn-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
