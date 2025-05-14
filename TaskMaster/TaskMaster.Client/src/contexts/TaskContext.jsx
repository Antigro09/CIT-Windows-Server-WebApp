import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../api/taskService';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: null,
    priority: null,
    searchTerm: '',
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDescending: true
  });

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks when filters change
  useEffect(() => {
    loadTasks();
  }, [filters]);

  const addTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks(prevTasks => [createdTask, ...prevTasks]);
      return createdTask;
    } catch (err) {
      setError(err.message || 'Failed to create task');
      throw err;
    }
  };

  const editTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      setTasks(prevTasks =>
        prevTasks.map(task => 
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      throw err;
    }
  };

  const changeTaskStatus = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, status } : task
        )
      );
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update task status');
      throw err;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, pageNumber: 1 })); // Reset to page 1 when filters change
  };

  const value = {
    tasks,
    isLoading,
    error,
    filters,
    updateFilters,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
    refreshTasks: loadTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};