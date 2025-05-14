import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { tasks, loading, error } = useTaskContext();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    overdue: 0,
    upcomingDeadlines: 0,
  });

  useEffect(() => {
    if (tasks && tasks.length) {
      const now = new Date();
      const completedTasks = tasks.filter(task => task.status === 'Done').length;
      const overdueTasks = tasks.filter(task => 
        task.status !== 'Done' && 
        task.dueDate && 
        new Date(task.dueDate) < now
      ).length;
      const upcomingDeadlines = tasks.filter(task => 
        task.status !== 'Done' && 
        task.dueDate && 
        new Date(task.dueDate) > now &&
        new Date(task.dueDate) < new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) // 3 days
      ).length;

      setStats({
        total: tasks.length,
        completed: completedTasks,
        overdue: overdueTasks,
        upcomingDeadlines,
      });
    }
  }, [tasks]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-600">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-600">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-600">Overdue</h3>
            <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-600">Upcoming Deadlines</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.upcomingDeadlines}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <TaskForm />
          <div className="mt-8">
            <TaskFilter />
          </div>
        </div>
        <div className="lg:col-span-9">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 p-4 rounded-md text-red-700">{error}</div>
          ) : (
            <TaskList />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;