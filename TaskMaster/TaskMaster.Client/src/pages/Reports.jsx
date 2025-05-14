import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../contexts/TaskContext';

const Reports = () => {
  const { tasks } = useTaskContext();
  const [reportType, setReportType] = useState('status');
  const [dateRange, setDateRange] = useState('week');
  
  const [statusData, setStatusData] = useState({
    Todo: 0,
    InProgress: 0,
    Done: 0,
    Archived: 0,
  });
  
  const [priorityData, setPriorityData] = useState({
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  });
  
  const [completionTimeData, setCompletionTimeData] = useState([]);
  
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;
    
    // Status breakdown
    const statusCounts = {
      Todo: 0,
      InProgress: 0,
      Done: 0,
      Archived: 0,
    };
    
    // Priority breakdown
    const priorityCounts = {
      Low: 0,
      Medium: 0,
      High: 0,
      Critical: 0,
    };
    
    // For completion time data
    const completedTasks = tasks.filter(task => 
      task.status === 'Done' && task.completedAt && task.createdAt
    );
    
    // Calculate date range filter
    const now = new Date();
    let cutoffDate;
    
    switch (dateRange) {
      case 'week':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'quarter':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case 'year':
        cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        cutoffDate = new Date(0); // Beginning of time
    }
    
    // Apply date filter
    const filteredTasks = dateRange === 'all' 
      ? tasks 
      : tasks.filter(task => new Date(task.createdAt) >= cutoffDate);
    
    // Count statuses and priorities
    filteredTasks.forEach(task => {
      if (statusCounts[task.status] !== undefined) {
        statusCounts[task.status]++;
      }
      
      if (priorityCounts[task.priority] !== undefined) {
        priorityCounts[task.priority]++;
      }
    });
    
    // Calculate completion time data for completed tasks
    const completionTimes = completedTasks
      .filter(task => new Date(task.createdAt) >= cutoffDate)
      .map(task => {
        const created = new Date(task.createdAt);
        const completed = new Date(task.completedAt);
        const daysToComplete = Math.floor((completed - created) / (24 * 60 * 60 * 1000));
        return {
          id: task.id,
          title: task.title,
          daysToComplete,
          priority: task.priority,
        };
      })
      .sort((a, b) => b.daysToComplete - a.daysToComplete)
      .slice(0, 10); // Top 10 longest tasks
    
    setStatusData(statusCounts);
    setPriorityData(priorityCounts);
    setCompletionTimeData(completionTimes);
    
  }, [tasks, dateRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports & Analytics</h1>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportType">
            Report Type
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={e => setReportType(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="status">Status Breakdown</option>
            <option value="priority">Priority Breakdown</option>
            <option value="completion">Completion Time</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateRange">
            Date Range
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      
      {/* Report Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {reportType === 'status' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800">Todo</h3>
                <p className="text-3xl font-bold text-yellow-600">{statusData.Todo}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800">In Progress</h3>
                <p className="text-3xl font-bold text-blue-600">{statusData.InProgress}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800">Done</h3>
                <p className="text-3xl font-bold text-green-600">{statusData.Done}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">Archived</h3>
                <p className="text-3xl font-bold text-gray-600">{statusData.Archived}</p>
              </div>
            </div>
            
            {/* Simple bar chart */}
            <div className="mt-8">
              <div className="flex items-end h-64">
                {Object.entries(statusData).map(([status, count]) => (
                  <div key={status} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-16 ${
                        status === 'Todo' ? 'bg-yellow-500' : 
                        status === 'InProgress' ? 'bg-blue-500' : 
                        status === 'Done' ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                      style={{ height: `${count * 10}%`, minHeight: '1%' }}
                    ></div>
                    <div className="mt-2 text-sm text-gray-600">{status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'priority' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Task Priority Distribution</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800">Low</h3>
                <p className="text-3xl font-bold text-green-600">{priorityData.Low}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800">Medium</h3>
                <p className="text-3xl font-bold text-blue-600">{priorityData.Medium}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-orange-800">High</h3>
                <p className="text-3xl font-bold text-orange-600">{priorityData.High}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-red-800">Critical</h3>
                <p className="text-3xl font-bold text-red-600">{priorityData.Critical}</p>
              </div>
            </div>
            
            {/* Simple bar chart */}
            <div className="mt-8">
              <div className="flex items-end h-64">
                {Object.entries(priorityData).map(([priority, count]) => (
                  <div key={priority} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-16 ${
                        priority === 'Low' ? 'bg-green-500' : 
                        priority === 'Medium' ? 'bg-blue-500' : 
                        priority === 'High' ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ height: `${count * 10}%`, minHeight: '1%' }}
                    ></div>
                    <div className="mt-2 text-sm text-gray-600">{priority}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'completion' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Task Completion Time</h2>
            
            {completionTimeData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Task</th>
                      <th className="py-2 px-4 border-b text-left">Priority</th>
                      <th className="py-2 px-4 border-b text-left">Days to Complete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completionTimeData.map(task => (
                      <tr key={task.id}>
                        <td className="py-2 px-4 border-b">{task.title}</td>
                        <td className="py-2 px-4 border-b">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                            ${task.priority === 'Low' ? 'bg-green-100 text-green-800' : 
                              task.priority === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                              task.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b">{task.daysToComplete} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No completed tasks in the selected date range.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;