"use client";

import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: any[];
  onTaskUpdate: (updatedTask: any) => void;
  onTaskDelete: (taskId: number) => void;
}

export default function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-8">You have no tasks. Add one to get started!</p>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onTaskUpdate}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  );
}
