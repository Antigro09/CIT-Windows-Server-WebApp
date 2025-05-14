// taskTypes.js
// Task status enum matching backend TaskStatus enum
export const TaskStatus = {
  TODO: 'Todo',
  IN_PROGRESS: 'InProgress',
  DONE: 'Done',
  ARCHIVED: 'Archived'
};

// Priority enum matching backend Priority enum
export const Priority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical'
};

export const TASK_STATUS_COLORS = {
  [TaskStatus.TODO]: 'bg-gray-100 text-gray-800',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TaskStatus.DONE]: 'bg-green-100 text-green-800',
  [TaskStatus.ARCHIVED]: 'bg-purple-100 text-purple-800'
};

export const PRIORITY_COLORS = {
  [Priority.LOW]: 'bg-gray-100 text-gray-800',
  [Priority.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [Priority.HIGH]: 'bg-orange-100 text-orange-800',
  [Priority.CRITICAL]: 'bg-red-100 text-red-800'
};

// Task DTO interface
export const TaskShape = {
  id: 'number',
  title: 'string',
  description: 'string?',
  status: 'TaskStatus',
  priority: 'Priority',
  createdAt: 'Date',
  dueDate: 'Date?',
  completedAt: 'Date?'
};