using TaskMaster.Core.Entities;

namespace TaskMaster.API.Models
{
    public class TaskItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskMaster.Core.Entities.TaskItem Status { get; set; }
        public Priority Priority { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CompletedAt { get; set; }
    }

    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Priority Priority { get; set; } = Priority.Medium;
        public DateTime? DueDate { get; set; }
    }

    public class UpdateTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Priority Priority { get; set; }
        public TaskMaster.Core.Entities.TaskItem Status { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class UpdateTaskStatusDto
    {
        public TaskMaster.Core.Entities.TaskItem Status { get; set; }
    }

    public class TaskFilterDto
    {
        public TaskMaster.Core.Entities.TaskItem? Status { get; set; }
        public Priority? Priority { get; set; }
        public DateTime? DueDateStart { get; set; }
        public DateTime? DueDateEnd { get; set; }
        public string? SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortBy { get; set; } = "CreatedAt";
        public bool SortDescending { get; set; } = true;
    }
}