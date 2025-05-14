import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import Header from './components/Header';
import { fetchTasks, createTask, updateTask, deleteTask, updateTaskStatus } from './api/taskService';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './contexts/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;