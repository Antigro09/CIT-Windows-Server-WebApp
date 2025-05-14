import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';

const TaskItem = ({ task, onEditClick }) => {
  const { changeTaskStatus, removeTask } = useTaskContext();

  const handleStatusChange = async (e) => {
    e.stopPropagation();
    await changeTaskStatus(task.id, e.target.value);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      await removeTask(task.id);
    }
  };

  // Determine styling based on priority
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Determine styling based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'InProgress': return 'bg-blue-100 text-blue-800';
      case 'Todo': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={() => onEditClick(task)}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {task.dueDate && (
            <span>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          {!task.dueDate && (
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <select 
            value={task.status}
            onChange={handleStatusChange}
            onClick={(e) => e.stopPropagation()}
            className="text-xs border rounded px-2 py-1 bg-gray-50"
          >
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Archived">Archive</option>
          </select>
          
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;