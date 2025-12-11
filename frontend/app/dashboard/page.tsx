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
        <div className="max-w-3xl mx-auto">
          <div className="bg-white bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Your Tasks</h2>
              <div className="text-sm text-gray-500">
                {tasks.filter(t => !t.completed).length} pending, {tasks.filter(t => t.completed).length} completed
              </div>
            </div>
            
            {error && <p className="text-red-500 text-center mb-6 bg-red-50 p-4 rounded-xl">{error}</p>}
            
            <NewTaskForm onCreate={handleCreateTask} loading={loadingTasks} />
            
            <div className="mt-10">
              {loadingTasks ? (
                <div className="flex justify-center items-center py-16">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                    <p className="text-gray-600">Loading your tasks...</p>
                  </div>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks yet</h3>
                  <p className="text-gray-600 max-w-md mx-auto">Add your first task to get started, and watch your productivity soar!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <TaskList
                    tasks={tasks}
                    onTaskUpdate={handleUpdateTask}
                    onTaskDelete={handleDeleteTask}
                  />
                </div>
              )}
            </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
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