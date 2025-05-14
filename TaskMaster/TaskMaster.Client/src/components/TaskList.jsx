import React, { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import TaskEditModal from './TaskEditModal';

const TaskList = () => {
  const { tasks, isLoading, error } = useTaskContext();
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Error loading tasks</p>
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks found</h3>
        <p className="mt-1 text-gray-500">Start by adding a new task using the form.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onEditClick={() => handleEditClick(task)} 
          />
        ))}
      </div>
      
      {editingTask && (
        <TaskEditModal 
          task={editingTask} 
          isOpen={!!editingTask} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default TaskList;