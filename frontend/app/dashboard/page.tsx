"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { tasksApi } from "@/lib/api";
import NewTaskForm from "@/components/NewTaskForm";
import TaskList from "@/components/TaskList";

export default function DashboardPage() {
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAddTaskCard, setShowAddTaskCard] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const { userId, token, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    async function fetchTasks() {
      if (isAuthenticated && userId && token) {
        setLoadingTasks(true);
        setError(null);
        try {
          const fetchedTasks = await tasksApi.getTasks(userId, token);
          setTasks(fetchedTasks);
        } catch (err: any) {
          setError(err.message || "Failed to fetch tasks.");
          // If 403 or 401, token might be invalid, force logout
          if (err.message.includes("401") || err.message.includes("403")) {
            logout();
          }
        } finally {
          setLoadingTasks(false);
        }
      }
    }
    fetchTasks();
  }, [isAuthenticated, userId, token, logout]);

  const handleCreateTask = async (title: string, description: string) => {
    if (!userId || !token) return;
    try {
      const newTask = await tasksApi.createTask(userId, token, { title, description });
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err: any) {
      setError(err.message || "Failed to create task.");
    }
  };

  const handleCreateNewTask = async () => {
    if (!newTaskTitle.trim() || !userId || !token) return;
    try {
      setLoadingTasks(true);
      const newTask = await tasksApi.createTask(userId, token, {
        title: newTaskTitle,
        description: newTaskDescription
      });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      // Reset form and hide card
      setNewTaskTitle("");
      setNewTaskDescription("");
      setShowAddTaskCard(false);
    } catch (err: any) {
      setError(err.message || "Failed to create task.");
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleUpdateTask = (updatedTask: any) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Todo<span className="font-extrabold">App</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Welcome back!</span>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-500">Online</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Your Tasks</h2>
                <div className="flex space-x-6 mt-2 text-sm">
                  <span className="text-indigo-600 font-medium">
                    {tasks.filter(t => !t.completed).length} pending
                  </span>
                  <span className="text-purple-600 font-medium">
                    {tasks.filter(t => t.completed).length} completed
                  </span>
                  <span className="text-gray-600">
                    Total: {tasks.length}
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: tasks.length > 0 ? `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` : '0%'
                  }}
                ></div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {loadingTasks ? (
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-ping opacity-20"></div>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">Loading your tasks...</p>
                </div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM34 56c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm37 11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-7 30c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z\' fill=\'%2391a0ef\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-20"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">No tasks yet</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">Get started by adding your first task and boost your productivity!</p>
                <button
                  onClick={() => setShowAddTaskCard(true)}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Your First Task
                  </span>
                </button>
              </div>
            ) : (
              <>
                {!showAddTaskCard && (
                  <div className="flex justify-center mb-8">
                    <button
                      onClick={() => setShowAddTaskCard(true)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add New Task
                    </button>
                  </div>
                )}
                {showAddTaskCard && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 transform transition-all duration-300 animate-fadeIn">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h3>
                      <div className="space-y-6">
                        <input
                          type="text"
                          placeholder="What needs to be done?"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="w-full px-5 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                          disabled={loadingTasks}
                          autoFocus
                        />
                        <textarea
                          placeholder="Add details (optional)..."
                          value={newTaskDescription}
                          onChange={(e) => setNewTaskDescription(e.target.value)}
                          className="w-full px-5 py-3 bg-white text-gray-800 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm hover:shadow-md focus:shadow-lg resize-none"
                          rows={3}
                          disabled={loadingTasks}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => {
                          setShowAddTaskCard(false);
                          setNewTaskTitle("");
                          setNewTaskDescription("");
                        }}
                        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition duration-300 font-medium"
                        disabled={loadingTasks}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateNewTask}
                        className="px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                        disabled={loadingTasks || !newTaskTitle.trim()}
                      >
                        {loadingTasks ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Task
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <TaskList
                    tasks={tasks}
                    onTaskUpdate={handleUpdateTask}
                    onTaskDelete={handleDeleteTask}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowAbout(true); }}>
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}>
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowTerms(true); }}>
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors" onClick={(e) => { e.preventDefault(); setShowContact(true); }}>
                Contact
              </a>
            </div>
          </div>
          <p className="text-gray-600">© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
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