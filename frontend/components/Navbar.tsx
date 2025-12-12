"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { isAuthenticated, userId, userEmail, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled
          ? "bg-white/90 shadow-lg py-3 border-b border-gray-100"
          : "bg-white/90 py-4"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">
                Todo<span className="text-indigo-600">App</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className="font-medium transition-all duration-300 relative group text-gray-700 hover:text-indigo-600"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#how-it-works"
              className="font-medium transition-all duration-300 relative group text-gray-700 hover:text-indigo-600"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#testimonials"
              className="font-medium transition-all duration-300 relative group text-gray-700 hover:text-indigo-600"
            >
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {userId ? userId.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white font-bold text-lg">
                          {userId ? userId.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="ml-3">
                          <p className="text-white font-bold text-base">User {userId || 'Guest'}</p>
                          <p className="text-indigo-100 text-sm truncate">{userEmail || 'user@example.com'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => alert('Change password functionality coming soon!')}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 font-medium cursor-pointer flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Change Password
                      </button>
                      <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 font-medium cursor-pointer flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-medium transition-all duration-300 relative group text-gray-700 hover:text-indigo-600"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-100">
              <Link
                href="/#features"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/#testimonials"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {userId ? userId.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">User ID: {userId || 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-300 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stunning Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 animate-fadeIn border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">Log Out</h3>
                  <p className="mt-2 text-gray-600">
                    Are you sure you want to log out? You'll need to sign in again to access your tasks.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                  setShowProfileDropdown(false);
                }}
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}