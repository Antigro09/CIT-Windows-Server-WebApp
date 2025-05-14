namespace TaskMaster.Core.Entities
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Todo;
        public Priority Priority { get; set; } = Priority.Medium;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        public DateTime? CompletedAt { get; set; }
    }

    public enum TaskStatus
    {
        Todo,
        InProgress,
        Done,
        Archived
    }

    public enum Priority
    {
        Low,
        Medium,
        High,
        Critical
    }
}