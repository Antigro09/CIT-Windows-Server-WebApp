// filepath: /workspaces/CIT-Windows-Server-WebApp/TaskMaster/TaskMaster.API/Data/SeedData.cs
using Microsoft.EntityFrameworkCore;
using System;
using TaskMaster.Core.Entities;

namespace TaskMaster.API.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());
            
            // Look for any existing data
            if (context.Tasks.Any())
            {
                return; // DB has been seeded
            }

            // Add sample tasks
            context.Tasks.AddRange(
                new TaskItem
                {
                    Title = "Finish project documentation",
                    Description = "Complete the user guide and API documentation",
                    Status = TaskStatus.Todo,
                    Priority = Priority.High,
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    DueDate = DateTime.UtcNow.AddDays(2)
                },
                new TaskItem
                {
                    Title = "Fix login bug",
                    Description = "Users are experiencing issues with social login",
                    Status = TaskStatus.InProgress,
                    Priority = Priority.Critical,
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    DueDate = DateTime.UtcNow.AddDays(1)
                },
                new TaskItem
                {
                    Title = "User research",
                    Description = "Conduct interviews with potential users",
                    Status = TaskStatus.Done,
                    Priority = Priority.Medium,
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    DueDate = DateTime.UtcNow.AddDays(-3),
                    CompletedAt = DateTime.UtcNow.AddDays(-3)
                },
                new TaskItem
                {
                    Title = "Weekly team meeting",
                    Description = "Discuss progress and plan next steps",
                    Status = TaskStatus.Todo,
                    Priority = Priority.Medium,
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    DueDate = DateTime.UtcNow.AddDays(3)
                },
                new TaskItem
                {
                    Title = "Review pull requests",
                    Description = "Check recent code changes from the team",
                    Status = TaskStatus.InProgress,
                    Priority = Priority.Low,
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new TaskItem
                {
                    Title = "Deployment planning",
                    Description = "Create deployment strategy for new features",
                    Status = TaskStatus.Todo,
                    Priority = Priority.High,
                    CreatedAt = DateTime.UtcNow,
                    DueDate = DateTime.UtcNow.AddDays(5)
                }
            );
            
            context.SaveChanges();
        }
    }
}