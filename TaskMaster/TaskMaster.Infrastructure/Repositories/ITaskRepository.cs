using Microsoft.EntityFrameworkCore; // Keep for EntityState if used, or for general EF Core types
using TaskMaster.Core.Entities;     // For TaskItem
using TaskMaster.Infrastructure.Data; // For IAppDbContext
using System.Linq;
using System.Threading.Tasks;

namespace TaskMaster.Infrastructure.Repositories
{
    public interface ITaskRepository
    {
        IQueryable<TaskItem> GetTasks();
        Task<TaskItem?> GetTaskByIdAsync(int id);
        Task<TaskItem> AddTaskAsync(TaskItem task);
        Task UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(TaskItem task);
        Task<bool> SaveChangesAsync();
    }

    public class TaskRepository : ITaskRepository
    {
        private readonly IAppDbContext _context; // Changed to IAppDbContext

        public TaskRepository(IAppDbContext context) // Changed to IAppDbContext
        {
            _context = context;
        }

        public IQueryable<TaskItem> GetTasks()
        {
            return _context.Tasks.AsQueryable();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<TaskItem> AddTaskAsync(TaskItem task)
        {
            await _context.Tasks.AddAsync(task);
            // Consider if SaveChangesAsync should be called here or explicitly by the service layer
            // For now, matching your original logic:
            await _context.SaveChangesAsync(); 
            return task;
        }

        public async Task UpdateTaskAsync(TaskItem task)
        {
            // _context.Entry(task).State = EntityState.Modified; // This is valid if task is detached
            // If task is tracked, or for simpler updates:
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTaskAsync(TaskItem task)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            // The SaveChangesAsync on IAppDbContext returns Task<int>
            return await _context.SaveChangesAsync(default) > 0; 
        }
    }
}