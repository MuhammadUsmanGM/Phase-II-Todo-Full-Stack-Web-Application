"use client";

import { useState } from "react";
import { tasksApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    owner_id: number;
  };
  onUpdate: (updatedTask: any) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);
  const { token, userId } = useAuth();

  const handleToggleComplete = async () => {
    if (!token || !userId) return;
    setLoading(true);
    try {
      const updated = await tasksApi.toggleTaskCompletion(
        userId,
        task.id,
        token,
        !task.completed
      );
      onUpdate(updated);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      alert("Failed to toggle task completion.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!token || !userId) return;
    setLoading(true);
    try {
      const updated = await tasksApi.updateTask(
        userId,
        task.id,
        token,
        { title: editedTitle, description: editedDescription }
      );
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !userId) return;
    if (!confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    try {
      await tasksApi.deleteTask(userId, task.id, token);
      onDelete(task.id);
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 bg-white rounded-2xl shadow-lg border-l-4 ${task.completed ? 'border-green-500 bg-gradient-to-r from-green-50 to-white' : 'border-indigo-500 bg-gradient-to-r from-white to-indigo-50'} transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      <div className="flex items-start">
        <div className="relative">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="mt-1 h-6 w-6 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer opacity-0 absolute"
            disabled={loading}
          />
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${task.completed ? 'border-green-500 bg-green-500' : 'border-indigo-300 hover:border-indigo-500'} transition-colors duration-300`}
          >
            {task.completed && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </div>
        <div className="ml-4 flex-grow">
          {isEditing ? (
            <div className="space-y-3 animate-fadeIn">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                disabled={loading}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                rows={2}
                disabled={loading}
              />
              <div className="flex space-x-3 mt-3">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(task.title);
                    setEditedDescription(task.description || "");
                  }}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h4 className={`text-lg font-bold ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                {task.title}
              </h4>
              {task.description && (
                <p className={`mt-2 text-gray-600 ${task.completed ? "line-through" : ""}`}>
                  {task.description}
                </p>
              )}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium bg-indigo-50 px-3 py-1.5 rounded-lg transition-all hover:bg-indigo-100"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-sm text-red-600 hover:text-red-800 font-medium bg-red-50 px-3 py-1.5 rounded-lg transition-all hover:bg-red-100"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
        <span className="bg-gray-100 px-2 py-1 rounded-full">Added: {new Date(task.created_at).toLocaleDateString()}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {task.completed ? (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Completed
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Pending
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
