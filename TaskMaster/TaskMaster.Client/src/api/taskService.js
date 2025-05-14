const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetches tasks with optional filtering and sorting parameters
 * @param {Object} filters - Filter criteria (status, priority, search, etc.)
 * @returns {Promise<Array>} Tasks array
 */
export const fetchTasks = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('Status', filters.status);
    if (filters.priority) queryParams.append('Priority', filters.priority);
    if (filters.searchTerm) queryParams.append('SearchTerm', filters.searchTerm);
    if (filters.sortBy) queryParams.append('SortBy', filters.sortBy);
    if (filters.sortDescending !== undefined) queryParams.append('SortDescending', filters.sortDescending);
    if (filters.pageNumber) queryParams.append('PageNumber', filters.pageNumber);
    if (filters.pageSize) queryParams.append('PageSize', filters.pageSize);
    if (filters.dueDateStart) queryParams.append('DueDateStart', filters.dueDateStart.toISOString());
    if (filters.dueDateEnd) queryParams.append('DueDateEnd', filters.dueDateEnd.toISOString());
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/tasks${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

/**
 * Creates a new task
 * @param {Object} taskData - Task data (title, description, priority, etc.)
 * @returns {Promise<Object>} Created task
 */
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Updates an existing task
 * @param {Object} taskData - Task data with id
 * @returns {Promise<Object>} Updated task
 */
export const updateTask = async (taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Updates just the status of a task
 * @param {number} taskId - Task ID
 * @param {string} status - New status (Todo, InProgress, Done)
 * @returns {Promise<boolean>} Success indicator
 */
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

/**
 * Deletes a task
 * @param {number} taskId - Task ID to delete
 * @returns {Promise<boolean>} Success indicator
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

/**
 * Fetches a single task by ID
 * @param {number} taskId - Task ID
 * @returns {Promise<Object>} Task object
 */
export const fetchTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
    throw error;
  }
};