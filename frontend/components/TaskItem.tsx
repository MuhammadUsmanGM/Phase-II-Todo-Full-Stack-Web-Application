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
    <div className="flex items-center p-4 bg-white border-b border-gray-200 last:border-b-0">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        className="form-checkbox h-5 w-5 text-blue-600 mr-4 cursor-pointer"
        disabled={loading}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 mr-2"
            disabled={loading}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="flex-grow px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 mr-2"
            rows={1}
            disabled={loading}
          />
          <button
            onClick={handleSaveEdit}
            className="px-3 py-1 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 mr-2"
            disabled={loading}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedTitle(task.title);
              setEditedDescription(task.description || "");
            }}
            className="px-3 py-1 text-sm text-gray-600 rounded-lg hover:bg-gray-200"
            disabled={loading}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="flex-grow">
            <h4 className={`text-lg ${task.completed ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className={`text-sm text-gray-600 ${task.completed ? "line-through" : ""}`}>
                {task.description}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm text-blue-600 hover:underline mr-2"
            disabled={loading}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm text-red-600 hover:underline"
            disabled={loading}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
