import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import Header from './components/Header';
import { fetchTasks, createTask, updateTask, deleteTask, updateTaskStatus } from './api/taskService';
import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './contexts/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <TaskForm />
              <div className="mt-8">
                <TaskFilter />
              </div>
            </div>
            <div className="lg:col-span-9">
              <TaskList />
            </div>
          </div>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </TaskProvider>
  );
}

export default App;