using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using TaskMaster.API.Data;
using TaskMaster.Core.Entities;

namespace TaskMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExportController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ExportController> _logger;

        public ExportController(AppDbContext context, ILogger<ExportController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("csv")]
        public async Task<IActionResult> ExportToCsv([FromQuery] ExportRequestDto request)
        {
            try
            {
                // Build query based on filters
                var query = _context.Tasks.AsQueryable();

                if (request.Status.HasValue)
                {
                    query = query.Where(t => t.Status == request.Status.Value);
                }

                if (request.Priority.HasValue)
                {
                    query = query.Where(t => t.Priority == request.Priority.Value);
                }

                if (request.FromDate.HasValue)
                {
                    query = query.Where(t => t.CreatedAt >= request.FromDate.Value);
                }

                if (request.ToDate.HasValue)
                {
                    query = query.Where(t => t.CreatedAt <= request.ToDate.Value);
                }

                // Sort by created date descending by default
                var tasks = await query
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync();

                // Create CSV content
                var csv = new System.Text.StringBuilder();
                csv.AppendLine("Id,Title,Description,Status,Priority,CreatedAt,DueDate,CompletedAt");

                foreach (var task in tasks)
                {
                    csv.AppendLine(string.Format("{0},\"{1}\",\"{2}\",{3},{4},{5},{6},{7}",
                        task.Id,
                        task.Title.Replace("\"", "\"\""), // Escape quotes in CSV
                        task.Description?.Replace("\"", "\"\"") ?? "",
                        task.Status,
                        task.Priority,
                        task.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
                        task.DueDate?.ToString("yyyy-MM-dd HH:mm:ss") ?? "",
                        task.CompletedAt?.ToString("yyyy-MM-dd HH:mm:ss") ?? ""));
                }

                // Return CSV file
                return File(System.Text.Encoding.UTF8.GetBytes(csv.ToString()), 
                    "text/csv", 
                    $"tasks-export-{DateTime.UtcNow:yyyyMMddHHmmss}.csv");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error exporting tasks to CSV");
                return StatusCode(500, "An error occurred while exporting data");
            }
        }

        [HttpGet("json")]
        public async Task<IActionResult> ExportToJson([FromQuery] ExportRequestDto request)
        {
            try
            {
                // Build query based on filters
                var query = _context.Tasks.AsQueryable();

                if (request.Status.HasValue)
                {
                    query = query.Where(t => t.Status == request.Status.Value);
                }

                if (request.Priority.HasValue)
                {
                    query = query.Where(t => t.Priority == request.Priority.Value);
                }

                if (request.FromDate.HasValue)
                {
                    query = query.Where(t => t.CreatedAt >= request.FromDate.Value);
                }

                if (request.ToDate.HasValue)
                {
                    query = query.Where(t => t.CreatedAt <= request.ToDate.Value);
                }

                // Sort by created date descending by default
                var tasks = await query
                    .OrderByDescending(t => t.CreatedAt)
                    .Select(t => new
                    {
                        t.Id,
                        t.Title,
                        t.Description,
                        Status = t.Status.ToString(),
                        Priority = t.Priority.ToString(),
                        CreatedAt = t.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
                        DueDate = t.DueDate?.ToString("yyyy-MM-dd HH:mm:ss"),
                        CompletedAt = t.CompletedAt?.ToString("yyyy-MM-dd HH:mm:ss")
                    })
                    .ToListAsync();

                // Return JSON file
                return File(System.Text.Encoding.UTF8.GetBytes(System.Text.Json.JsonSerializer.Serialize(tasks)), 
                    "application/json", 
                    $"tasks-export-{DateTime.UtcNow:yyyyMMddHHmmss}.json");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error exporting tasks to JSON");
                return StatusCode(500, "An error occurred while exporting data");
            }
        }
    }

    public class ExportRequestDto
    {
        public TaskStatus? Status { get; set; }
        public Priority? Priority { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime? FromDate { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime? ToDate { get; set; }
    }
}
