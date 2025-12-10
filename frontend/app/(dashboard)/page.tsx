"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { tasksApi } from "@/lib/api";
import NewTaskForm from "@/components/NewTaskForm";
import TaskList from "@/components/TaskList";

export default function DashboardPage() {
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
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Your Tasks</h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <div className="max-w-2xl mx-auto">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <NewTaskForm onCreate={handleCreateTask} loading={loadingTasks} />
        {loadingTasks ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdate={handleUpdateTask}
            onTaskDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}
