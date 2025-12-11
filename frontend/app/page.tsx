"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-20 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative mx-auto px-4 z-10">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto">
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                  <span className="block">Organize Your Life</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    One Task at a Time
                  </span>
                </h1>
                <p className="mt-6 text-xl text-gray-700 max-w-lg mx-auto">
                  {isAuthenticated ? (
                    "Welcome back! Manage your tasks and boost your productivity."
                  ) : (
                    "A powerful and intuitive task management application designed to boost your productivity and simplify your daily routine."
                  )}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  {isAuthenticated ? (
                    <Link
                      href="/dashboard"
                      className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-indigo-200 hover:border-indigo-400"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                      >
                        Sign Up Free
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto mt-12 lg:mt-0">
              <div className="relative flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Card with floating animation */}
                  <div className="absolute -top-6 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-lg transform rotate-6"></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-sm text-indigo-600 font-semibold">TodoApp Dashboard</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" defaultChecked />
                        <span className="ml-3 text-gray-700 line-through">Review quarterly reports</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                        <span className="ml-3 text-gray-700">Prepare project presentation</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                        <span className="ml-3 text-gray-700">Team meeting with design team</span>
                      </div>
                    </div>

                    <div className="mt-6 flex">
                      <input
                        type="text"
                        placeholder="Add a new task..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-20">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Everything you need to stay organized and boost your productivity
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-4/12 lg:w-3/12 px-4 group">
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-indigo-500 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="pt-10 text-center">
                  <h5 className="text-xl font-bold text-gray-800 mb-2">Task Management</h5>
                  <p className="text-gray-600">
                    Create, update, and organize your tasks with ease
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 lg:w-3/12 px-4 group">
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-purple-500 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="pt-10 text-center">
                  <h5 className="text-xl font-bold text-gray-800 mb-2">Secure & Private</h5>
                  <p className="text-gray-600">
                    Your data is protected with industry-standard security measures
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 lg:w-3/12 px-4 group">
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-pink-500 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="pt-10 text-center">
                  <h5 className="text-xl font-bold text-gray-800 mb-2">Real-time Sync</h5>
                  <p className="text-gray-600">
                    Access your tasks from anywhere, anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mb-12 md:mb-0">
              <div className="relative flex justify-center">
                <div className="relative w-full max-w-sm">
                  {/* Animated dashboard preview */}
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 transform rotate-3 animate-pulse">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-3/4 h-4 bg-white bg-opacity-30 rounded animate-pulse"></div>
                      <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-white bg-opacity-30 rounded animate-pulse mr-2"></div>
                        <div className="h-4 bg-white bg-opacity-30 rounded flex-grow animate-pulse"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-white bg-opacity-30 rounded animate-pulse mr-2"></div>
                        <div className="h-4 bg-white bg-opacity-30 rounded flex-grow animate-pulse"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-white bg-opacity-30 rounded animate-pulse mr-2"></div>
                        <div className="h-4 bg-white bg-opacity-30 rounded flex-grow animate-pulse"></div>
                      </div>
                    </div>

                    <div className="mt-6 h-10 bg-white bg-opacity-30 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-5/12 px-4 ml-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h3>
              <p className="text-lg text-gray-600 mb-8">
                Our simple three-step process helps you get organized in no time:
              </p>
              <div className="space-y-6">
                <div className="flex group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 text-xl font-bold rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      1
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Sign Up</h4>
                    <p className="text-gray-600">Create your free account in seconds</p>
                  </div>
                </div>

                <div className="flex group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 text-xl font-bold rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      2
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Create Tasks</h4>
                    <p className="text-gray-600">Add your tasks and organize them by priority</p>
                  </div>
                </div>

                <div className="flex group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 text-xl font-bold rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      3
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Track & Accomplish</h4>
                    <p className="text-gray-600">Monitor your progress and celebrate your achievements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600">
                Join thousands of satisfied users who have transformed their productivity
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-5/12 lg:w-4/12 px-4">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-indigo-500 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 text-lg">
                  "This app has completely changed how I organize my daily tasks. I'm more productive than ever before!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg text-gray-900">John Doe</h4>
                    <p className="text-gray-600">Marketing Manager</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-5/12 lg:w-4/12 px-4">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 text-lg">
                  "The interface is intuitive and the task management features are exactly what I needed for my projects."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                    SM
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg text-gray-900">Sarah Miller</h4>
                    <p className="text-gray-600">Software Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-32 relative block bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 pt-32 pb-24">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Productivity?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-lg mx-auto">
                {isAuthenticated ? (
                  "You're already signed in! Go to your dashboard to manage your tasks."
                ) : (
                  "Join our community today and take control of your tasks. Sign up for a free account and start organizing your life right away."
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowAbout(true); }}>
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}>
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowTerms(true); }}>
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowContact(true); }}>
              Contact
            </a>
          </div>
          <div className="mt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} TodoApp. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">About TodoApp</h3>
                <button
                  onClick={() => setShowAbout(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="text-gray-600">
                <p className="mb-4">
                  TodoApp is a powerful task management application designed to help you organize your life and boost productivity.
                  Our mission is to simplify task management with an intuitive and user-friendly interface.
                </p>
                <p className="mb-4">
                  Whether you're managing personal tasks, work projects, or team collaborations, TodoApp provides the tools you need
                  to stay organized and on track. Our platform is built with the latest technology to ensure a seamless experience
                  across all devices.
                </p>
                <p>
                  We believe in helping people achieve their goals one task at a time, and our platform is designed with that
                  philosophy at its core. Join thousands of users who have transformed their productivity with TodoApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Privacy Policy</h3>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="text-gray-600 space-y-3">
                <p>
                  At TodoApp, we are committed to protecting your privacy and personal information.
                  This Privacy Policy outlines how we collect, use, and protect your data when you use our services.
                </p>

                <h4 className="font-bold text-lg mt-4">Information We Collect</h4>
                <p>
                  We only collect the information necessary for you to use our services, including your email address
                  and any tasks or personal information you choose to store in your TodoApp account.
                </p>

                <h4 className="font-bold text-lg mt-4">How We Use Your Information</h4>
                <p>
                  Your information is used solely to provide and improve our services, including personalizing your
                  task management experience and communicating with you about your account.
                </p>

                <h4 className="font-bold text-lg mt-4">Data Security</h4>
                <p>
                  We implement appropriate security measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h4 className="font-bold text-lg mt-4">Third-Party Services</h4>
                <p>
                  We do not share your personal information with third parties except as required by law
                  or to provide our services (e.g., cloud hosting providers).
                </p>

                <p className="mt-4">
                  For any questions about this Privacy Policy, please contact us through our Contact page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Terms of Service</h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="text-gray-600 space-y-3">
                <p>
                  Welcome to TodoApp. These Terms of Service govern your use of our platform and
                  constitute an agreement between you and TodoApp.
                </p>

                <h4 className="font-bold text-lg mt-4">Acceptance of Terms</h4>
                <p>
                  By creating an account and using TodoApp, you agree to be bound by these Terms and
                  all applicable laws and regulations.
                </p>

                <h4 className="font-bold text-lg mt-4">User Responsibilities</h4>
                <p>
                  You are responsible for maintaining the security of your account and for any
                  activities that occur under your account.
                </p>

                <h4 className="font-bold text-lg mt-4">Account Registration</h4>
                <p>
                  You must provide accurate and complete information when registering for TodoApp.
                  You are responsible for keeping your account information up-to-date.
                </p>

                <h4 className="font-bold text-lg mt-4">Acceptable Use</h4>
                <p>
                  You agree not to use TodoApp for any unlawful purposes or in any way that
                  could damage or impair our services.
                </p>

                <h4 className="font-bold text-lg mt-4">Data and Content</h4>
                <p>
                  You retain ownership of any content you store in your TodoApp account.
                  By using our services, you grant us a limited license to access and use your
                  content solely to provide the TodoApp services.
                </p>

                <h4 className="font-bold text-lg mt-4">Limitation of Liability</h4>
                <p>
                  TodoApp shall not be liable for any indirect, incidental, or consequential
                  damages arising from your use of our services.
                </p>

                <p className="mt-4">
                  We reserve the right to modify these terms at any time. Continued use of
                  TodoApp after such modifications constitutes your acceptance of the updated terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
                <button
                  onClick={() => setShowContact(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="text-gray-600 space-y-4">
                <p>
                  Have questions or feedback? We'd love to hear from you! Reach out to us through any of the following channels:
                </p>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:mu.ai.dev@gmail.com" className="text-indigo-600 hover:text-indigo-800">mu.ai.dev@gmail.com</a>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a href="https://github.com/MuhammadUsmanGM" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">github.com/MuhammadUsmanGM</a>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9" />
                    </svg>
                    <a href="https://www.linkedin.com/in/muhammad-usman-ai-dev" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">linkedin.com/in/muhammad-usman-ai-dev</a>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-lg mb-3">Connect with Us</h4>
                  <p>
                    Feel free to reach out for support, feature requests, feedback, or just to say hello.
                    We value our community and look forward to connecting with you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
