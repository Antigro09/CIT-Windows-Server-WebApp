using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskMaster.API.Models;
using TaskMaster.API.Services;
using TaskMaster.Core.Entities;

namespace TaskMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItemDto>>> GetTasks([FromQuery] TaskFilterDto filter)
        {
            var tasks = await _taskService.GetTasksAsync(filter);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItemDto>> GetTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskItemDto>> CreateTask(CreateTaskDto taskDto)
        {
            var createdTask = await _taskService.CreateTaskAsync(taskDto);
            
            return CreatedAtAction(
                nameof(GetTask),
                new { id = createdTask.Id },
                createdTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto taskDto)
        {
            if (id != taskDto.Id)
            {
                return BadRequest();
            }

            var result = await _taskService.UpdateTaskAsync(taskDto);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] UpdateTaskStatusDto statusDto)
        {
            var result = await _taskService.UpdateTaskStatusAsync(id, statusDto.Status);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var result = await _taskService.DeleteTaskAsync(id);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}