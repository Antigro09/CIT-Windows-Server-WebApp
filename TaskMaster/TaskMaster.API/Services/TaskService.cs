// filepath: /workspaces/CIT-Windows-Server-WebApp/TaskMaster/TaskMaster.API/Services/TaskService.cs
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskMaster.API.Models;
using TaskMaster.Core.Entities;
using TaskMaster.Infrastructure.Repositories;

namespace TaskMaster.API.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItemDto>> GetTasksAsync(TaskFilterDto filter);
        Task<TaskItemDto?> GetTaskByIdAsync(int id);
        Task<TaskItemDto> CreateTaskAsync(CreateTaskDto taskDto);
        Task<bool> UpdateTaskAsync(UpdateTaskDto taskDto);
        Task<bool> UpdateTaskStatusAsync(int id, TaskStatus status);
        Task<bool> DeleteTaskAsync(int id);
    }

    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;

        public TaskService(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TaskItemDto>> GetTasksAsync(TaskFilterDto filter)
        {
            var query = _taskRepository.GetTasks();

            // Apply filters
            if (filter.Status.HasValue)
                query = query.Where(t => t.Status == filter.Status);

            if (filter.Priority.HasValue)
                query = query.Where(t => t.Priority == filter.Priority);

            if (!string.IsNullOrEmpty(filter.SearchTerm))
                query = query.Where(t => t.Title.Contains(filter.SearchTerm) || 
                                      (t.Description != null && t.Description.Contains(filter.SearchTerm)));

            if (filter.DueDateStart.HasValue)
                query = query.Where(t => t.DueDate >= filter.DueDateStart);

            if (filter.DueDateEnd.HasValue)
                query = query.Where(t => t.DueDate <= filter.DueDateEnd);

            // Apply sorting
            query = filter.SortBy.ToLower() switch
            {
                "title" => filter.SortDescending ? query.OrderByDescending(t => t.Title) : query.OrderBy(t => t.Title),
                "duedate" => filter.SortDescending ? query.OrderByDescending(t => t.DueDate) : query.OrderBy(t => t.DueDate),
                "priority" => filter.SortDescending ? query.OrderByDescending(t => t.Priority) : query.OrderBy(t => t.Priority),
                "status" => filter.SortDescending ? query.OrderByDescending(t => t.Status) : query.OrderBy(t => t.Status),
                _ => filter.SortDescending ? query.OrderByDescending(t => t.CreatedAt) : query.OrderBy(t => t.CreatedAt)
            };

            // Apply pagination
            var tasks = await Task.FromResult(query
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList());

            return _mapper.Map<IEnumerable<TaskItemDto>>(tasks);
        }

        public async Task<TaskItemDto?> GetTaskByIdAsync(int id)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id);
            if (task == null) return null;
            return _mapper.Map<TaskItemDto>(task);
        }

        public async Task<TaskItemDto> CreateTaskAsync(CreateTaskDto taskDto)
        {
            var task = _mapper.Map<TaskItem>(taskDto);
            await _taskRepository.AddTaskAsync(task);
            return _mapper.Map<TaskItemDto>(task);
        }

        public async Task<bool> UpdateTaskAsync(UpdateTaskDto taskDto)
        {
            var existingTask = await _taskRepository.GetTaskByIdAsync(taskDto.Id);
            if (existingTask == null) return false;

            // Update task properties
            _mapper.Map(taskDto, existingTask);
            
            // Update completion date if status is changed to Done
            if (existingTask.Status == TaskStatus.Done && existingTask.CompletedAt == null)
                existingTask.CompletedAt = DateTime.UtcNow;
            else if (existingTask.Status != TaskStatus.Done)
                existingTask.CompletedAt = null;

            await _taskRepository.UpdateTaskAsync(existingTask);
            return true;
        }

        public async Task<bool> UpdateTaskStatusAsync(int id, TaskStatus status)
        {
            var existingTask = await _taskRepository.GetTaskByIdAsync(id);
            if (existingTask == null) return false;

            existingTask.Status = status;
            
            // Update completion date if status is changed to Done
            if (status == TaskStatus.Done && existingTask.CompletedAt == null)
                existingTask.CompletedAt = DateTime.UtcNow;
            else if (status != TaskStatus.Done)
                existingTask.CompletedAt = null;

            await _taskRepository.UpdateTaskAsync(existingTask);
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id);
            if (task == null) return false;

            await _taskRepository.DeleteTaskAsync(task);
            return true;
        }
    }
}