using TaskMaster.Core.Entities;
using TaskMaster.Core.Specifications;

namespace TaskMaster.Core.Specifications
{
    /// <summary>
    /// Task specifications for filtering, sorting, and pagination
    /// </summary>
    public class TaskSpecification : BaseSpecification<TaskItem>
    {
        /// <summary>
        /// Default constructor for getting all tasks
        /// </summary>
        public TaskSpecification() : base()
        {
            ApplyOrderByDescending(x => x.CreatedAt);
        }

        /// <summary>
        /// Constructor for filtering tasks
        /// </summary>
        /// <param name="status">Task status</param>
        /// <param name="priority">Task priority</param>
        /// <param name="searchTerm">Search term for title and description</param>
        /// <param name="dueDateStart">Due date start range</param>
        /// <param name="dueDateEnd">Due date end range</param>
        /// <param name="orderBy">Property to order by</param>
        /// <param name="orderDescending">Whether to order descending</param>
        /// <param name="pageNumber">Page number (1-based)</param>
        /// <param name="pageSize">Page size</param>
        public TaskSpecification(
            TaskStatus? status,
            Priority? priority,
            string? searchTerm,
            DateTime? dueDateStart,
            DateTime? dueDateEnd,
            string orderBy,
            bool orderDescending,
            int pageNumber,
            int pageSize
        ) : base(BuildCriteria(status, priority, searchTerm, dueDateStart, dueDateEnd))
        {
            ApplyOrderingAndPaging(orderBy, orderDescending, pageNumber, pageSize);
        }

        /// <summary>
        /// Constructor for getting task by id
        /// </summary>
        /// <param name="id">Task id</param>
        public TaskSpecification(int id) : base(x => x.Id == id)
        {
        }

        /// <summary>
        /// Build criteria expression for filtering tasks
        /// </summary>
        private static System.Linq.Expressions.Expression<Func<TaskItem, bool>> BuildCriteria(
            TaskStatus? status,
            Priority? priority,
            string? searchTerm,
            DateTime? dueDateStart,
            DateTime? dueDateEnd)
        {
            return x =>
                (!status.HasValue || x.Status == status.Value) &&
                (!priority.HasValue || x.Priority == priority.Value) &&
                (string.IsNullOrWhiteSpace(searchTerm) || 
                    x.Title.ToLower().Contains(searchTerm.ToLower()) || 
                    (x.Description != null && x.Description.ToLower().Contains(searchTerm.ToLower()))) &&
                (!dueDateStart.HasValue || x.DueDate >= dueDateStart.Value) &&
                (!dueDateEnd.HasValue || x.DueDate <= dueDateEnd.Value);
        }

        /// <summary>
        /// Apply ordering and paging
        /// </summary>
        private void ApplyOrderingAndPaging(string orderBy, bool orderDescending, int pageNumber, int pageSize)
        {
            // Apply ordering
            switch (orderBy.ToLower())
            {
                case "title":
                    if (orderDescending)
                        ApplyOrderByDescending(x => x.Title);
                    else
                        ApplyOrderBy(x => x.Title);
                    break;
                case "duedate":
                    if (orderDescending)
                        ApplyOrderByDescending(x => x.DueDate ?? DateTime.MaxValue);
                    else
                        ApplyOrderBy(x => x.DueDate ?? DateTime.MaxValue);
                    break;
                case "priority":
                    if (orderDescending)
                        ApplyOrderByDescending(x => x.Priority);
                    else
                        ApplyOrderBy(x => x.Priority);
                    break;
                case "status":
                    if (orderDescending)
                        ApplyOrderByDescending(x => x.Status);
                    else
                        ApplyOrderBy(x => x.Status);
                    break;
                default:
                    // Default to created date descending
                    if (orderDescending)
                        ApplyOrderByDescending(x => x.CreatedAt);
                    else
                        ApplyOrderBy(x => x.CreatedAt);
                    break;
            }

            // Apply paging
            ApplyPaging((pageNumber - 1) * pageSize, pageSize);
        }
    }
}