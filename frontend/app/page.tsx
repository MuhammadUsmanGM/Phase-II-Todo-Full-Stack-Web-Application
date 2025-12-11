"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const { isAuthenticated } = useAuth();
  // Handle scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      // Add a class to body when scrolled for navbar
      if (window.scrollY > 10) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-300/30 to-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

          {/* Floating animated shapes - Green, Yellow, Red */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-green-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-red-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-3/4 right-1/4 w-14 h-14 bg-green-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/5 right-1/5 w-10 h-10 bg-red-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative mx-auto px-4 z-10">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto">
              <div className="text-center lg:text-left animate-slideUp">
                <div className="inline-flex items-center px-4 py-1.5 bg-indigo-100/80 backdrop-blur-sm rounded-full mb-6 animate-slideUp delay-100">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-indigo-800 font-medium text-sm">Boost your productivity today</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight animate-slideUp delay-200">
                  <span className="block">Organize Your Life</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    One Task at a Time
                  </span>
                </h1>
                <p className="mt-6 text-xl text-gray-800 max-w-lg mx-auto lg:mx-0 animate-slideUp delay-300">
                  {isAuthenticated ? (
                    "Welcome back! Manage your tasks and boost your productivity with our powerful tools."
                  ) : (
                    "A powerful and intuitive task management application designed to boost your productivity and simplify your daily routine."
                  )}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-slideUp delay-400">
                  {isAuthenticated ? (
                    <Link
                      href="/dashboard"
                      className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h2M7 7h10" />
                        </svg>
                        Go to Dashboard
                      </span>
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-800 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="relative px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-indigo-200 hover:border-indigo-400 overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          Sign In
                        </span>
                        <div className="absolute inset-0 w-full h-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </Link>
                      <Link
                        href="/register"
                        className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          Sign Up Free
                        </span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-800 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto mt-12 lg:mt-0">
              <div className="relative flex justify-center animate-slideUp delay-500">
                <div className="relative w-full max-w-sm">
                  {/* Macbook-style Frame with enhanced styling */}
                  <div className="relative bg-gradient-to-b from-gray-200 to-gray-100 rounded-t-3xl shadow-2xl p-3 border-b-[6px] border-gray-300">
                    <div className="flex space-x-2 px-4 py-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                    </div>
                  </div>

                  {/* Stunning Card Content */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    {/* Glassmorphism Header */}
                    <div className="p-5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border-b border-gray-200/50">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">My Tasks</h3>
                        <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full shadow">
                          1 Remaining
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">Today, December 11</p>
                    </div>

                    {/* Task List with Enhanced Styling */}
                    <div className="p-5 space-y-4">
                      {/* Task Item 1 - Completed */}
                      <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50 shadow-sm group hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-transparent mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-500 line-through text-sm">Design the new landing page</span>
                      </div>

                      {/* Task Item 2 - Active */}
                      <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-300/50 shadow-md transform -translate-y-0.5 group hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-indigo-400 mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-100"></div>
                        </div>
                        <span className="text-gray-800 font-medium text-sm">Implement backend API endpoints</span>
                      </div>

                      {/* Task Item 3 - Input field styled as a task */}
                      <div className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-dashed border-indigo-300/50 group hover:shadow-sm transition-shadow duration-300">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0 opacity-60">
                        </div>
                        <input
                          type="text"
                          placeholder="Add a new task..."
                          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Action Button with Stunning Design */}
                    <div className="p-5 pt-2 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
                      <button className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <div className="inline-flex items-center px-4 py-1.5 bg-indigo-100/30 backdrop-blur-sm rounded-full mb-8 animate-slideUp delay-100">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-indigo-800 font-medium text-sm">Why choose our platform</span>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 animate-slideUp delay-200">Powerful Features</h2>
              <p className="text-lg leading-relaxed text-gray-600 max-w-xl mx-auto animate-slideUp delay-300">
                Everything you need to stay organized and boost your productivity
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group animate-slideUp delay-400">
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-500 transform hover:-translate-y-3 transition-transform duration-300 h-full">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="pt-8 text-center mt-4">
                  <h5 className="text-xl font-bold text-gray-800 mb-4">Task Management</h5>
                  <p className="text-gray-600">
                    Create, update, and organize your tasks with our intuitive interface for maximum efficiency
                  </p>
                </div>
              </div>
            </div>

            <div className="group animate-slideUp delay-500">
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500 transform hover:-translate-y-3 transition-transform duration-300 h-full">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="pt-8 text-center mt-4">
                  <h5 className="text-xl font-bold text-gray-800 mb-4">Secure & Private</h5>
                  <p className="text-gray-600">
                    Your data is protected with industry-standard security measures and encryption
                  </p>
                </div>
              </div>
            </div>

            <div className="group animate-slideUp delay-600">
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-pink-500 transform hover:-translate-y-3 transition-transform duration-300 h-full">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center group-hover:from-pink-600 group-hover:to-rose-600 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="pt-8 text-center mt-4">
                  <h5 className="text-xl font-bold text-gray-800 mb-4">Real-time Sync</h5>
                  <p className="text-gray-600">
                    Access your tasks from anywhere, anytime with seamless synchronization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <div className="inline-flex items-center px-4 py-1.5 bg-indigo-100/30 backdrop-blur-sm rounded-full mb-8 animate-slideUp">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-indigo-800 font-medium text-sm">How it works</span>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 animate-slideUp delay-200">Simple 3-Step Process</h2>
              <p className="text-lg leading-relaxed text-gray-600 max-w-xl mx-auto animate-slideUp delay-300">
                Get started with our simple three-step process to boost your productivity
              </p>
            </div>
          </div>

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
              <div className="space-y-12">
                <div className="flex group animate-slideUp delay-400">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                      1
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Sign Up</h4>
                    <p className="text-gray-600">
                      Create your free account in seconds with our simple registration process
                    </p>
                  </div>
                </div>

                <div className="flex group animate-slideUp delay-500">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                      2
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Add Your Tasks</h4>
                    <p className="text-gray-600">
                      Create, organize, and prioritize your tasks to stay on track and boost productivity
                    </p>
                  </div>
                </div>

                <div className="flex group animate-slideUp delay-600">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                      3
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Track & Achieve</h4>
                    <p className="text-gray-600">
                      Monitor your progress, complete tasks, and accomplish your goals efficiently
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <div className="inline-flex items-center px-4 py-1.5 bg-indigo-100/30 backdrop-blur-sm rounded-full mb-6 animate-slideUp">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-indigo-800 font-medium text-sm">Trusted by thousands of users</span>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 animate-slideUp delay-200">What Our Users Say</h2>
              <p className="text-lg text-gray-600 animate-slideUp delay-300">
                Join our community of satisfied users who have transformed their productivity
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="w-full px-4 animate-slideUp delay-400">
              <div className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 transform hover:-translate-y-2 hover:shadow-2xl h-full">
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

            <div className="w-full px-4 animate-slideUp delay-500">
              <div className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 transform hover:-translate-y-2 hover:shadow-2xl h-full">
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 font-bold text-lg">
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
      <section className="pb-32 relative block bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 animate-slideUp delay-100">
              <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by thousands of users worldwide
            </div>
            <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight animate-slideUp delay-200">
              Ready to Transform <br />Your Productivity?
            </h2>
            <p className="text-xl leading-relaxed mb-10 text-indigo-100 max-w-2xl mx-auto animate-slideUp delay-300">
              {isAuthenticated ? (
                "You're already signed in! Access your dashboard to manage your tasks and boost your productivity."
              ) : (
                "Join our thriving community and take control of your tasks. Create a free account and revolutionize the way you organize your life."
              )}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-16 animate-slideUp delay-400">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm relative overflow-hidden group"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h2M7 7h10" />
                    </svg>
                    Go to Dashboard
                  </span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm relative overflow-hidden group"
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create Account
                    </span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                  <Link
                    href="/login"
                    className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden group"
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </span>
                    <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
                  </Link>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-slideUp delay-500">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-indigo-500/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Achieve Goals</h3>
                <p className="text-indigo-200">Break down big goals into manageable tasks and track your progress</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
                <p className="text-indigo-200">Share tasks with your team and collaborate on projects seamlessly</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transform transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-pink-500/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smart Insights</h3>
                <p className="text-indigo-200">Gain insights into your productivity patterns and habits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-600">&copy; {new Date().getFullYear()} TodoApp. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                Terms
              </a>
            </div>
            <div className="flex space-x-6 text-gray-500">
              <a href="https://github.com/MuhammadUsmanGM" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/muhammad-usman-ai-dev" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="mailto:mu.ai.dev@gmail.com" className="hover:text-indigo-600 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
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
