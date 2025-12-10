"use client";

import { useState } from "react";

interface NewTaskFormProps {
  onCreate: (title: string, description: string) => void;
  loading: boolean;
}

export default function NewTaskForm({ onCreate, loading }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        placeholder="New task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        required
        disabled={loading}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        rows={1}
        disabled={loading}
      />
      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
