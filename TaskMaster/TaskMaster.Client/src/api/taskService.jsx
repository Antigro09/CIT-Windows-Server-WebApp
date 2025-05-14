import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7123/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for handling auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const fetchTasks = async (filter) => {
  try {
    const response = await api.get('/tasks', { params: filter });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await api.post('/tasks', task);
    toast.success('Task created successfully');
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (task) => {
  try {
    await api.put(`/tasks/${task.id}`, task);
    toast.success('Task updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    await api.patch(`/tasks/${id}/status`, { status });
    toast.success('Task status updated');
    return true;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    toast.success('Task deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};