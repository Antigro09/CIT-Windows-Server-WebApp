using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskMaster.API.Data;
using TaskMaster.API.Models;
using TaskMaster.Core.Entities;

namespace TaskMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<ActionResult<DashboardSummaryDto>> GetSummary()
        {
            var totalTasks = await _context.Tasks.CountAsync();
            var completedTasks = await _context.Tasks.CountAsync(t => t.Status == TaskStatus.Done);
            var inProgressTasks = await _context.Tasks.CountAsync(t => t.Status == TaskStatus.InProgress);
            var todoTasks = await _context.Tasks.CountAsync(t => t.Status == TaskStatus.Todo);
            var overdueTasks = await _context.Tasks.CountAsync(t => 
                t.Status != TaskStatus.Done && 
                t.DueDate.HasValue && 
                t.DueDate.Value < DateTime.UtcNow);
            
            var criticalTasks = await _context.Tasks.CountAsync(t => 
                t.Status != TaskStatus.Done && 
                t.Priority == Priority.Critical);

            var summary = new DashboardSummaryDto
            {
                TotalTasks = totalTasks,
                CompletedTasks = completedTasks,
                InProgressTasks = inProgressTasks,
                TodoTasks = todoTasks,
                OverdueTasks = overdueTasks,
                CriticalTasks = criticalTasks,
                CompletionRate = totalTasks > 0 ? (double)completedTasks / totalTasks * 100 : 0
            };

            return Ok(summary);
        }

        [HttpGet("recent-tasks")]
        public async Task<ActionResult<IEnumerable<TaskItemDto>>> GetRecentTasks()
        {
            var recentTasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .Take(5)
                .Select(t => new TaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    CompletedAt = t.CompletedAt
                })
                .ToListAsync();

            return Ok(recentTasks);
        }

        [HttpGet("tasks-by-status")]
        public async Task<ActionResult<IEnumerable<StatusCountDto>>> GetTasksByStatus()
        {
            var tasksByStatus = await _context.Tasks
                .GroupBy(t => t.Status)
                .Select(g => new StatusCountDto
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            return Ok(tasksByStatus);
        }

        [HttpGet("tasks-by-priority")]
        public async Task<ActionResult<IEnumerable<PriorityCountDto>>> GetTasksByPriority()
        {
            var tasksByPriority = await _context.Tasks
                .GroupBy(t => t.Priority)
                .Select(g => new PriorityCountDto
                {
                    Priority = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            return Ok(tasksByPriority);
        }
    }

    public class DashboardSummaryDto
    {
        public int TotalTasks { get; set; }
        public int CompletedTasks { get; set; }
        public int InProgressTasks { get; set; }
        public int TodoTasks { get; set; }
        public int OverdueTasks { get; set; }
        public int CriticalTasks { get; set; }
        public double CompletionRate { get; set; }
    }

    public class StatusCountDto
    {
        public TaskStatus Status { get; set; }
        public int Count { get; set; }
    }

    public class PriorityCountDto
    {
        public Priority Priority { get; set; }
        public int Count { get; set; }
    }
}
