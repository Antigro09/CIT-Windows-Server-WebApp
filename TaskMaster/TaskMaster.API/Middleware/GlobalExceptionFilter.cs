using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace TaskMaster.API.Middleware
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionFilter(
            ILogger<GlobalExceptionFilter> logger,
            IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(new EventId(0), context.Exception, context.Exception.Message);

            var response = new ApiResponse
            {
                Success = false,
                Message = _env.IsDevelopment() 
                    ? context.Exception.Message 
                    : "An unexpected error occurred."
            };

            if (_env.IsDevelopment())
            {
                response.DeveloperMessage = context.Exception.StackTrace;
            }

            context.Result = new ObjectResult(response)
            {
                StatusCode = (int)HttpStatusCode.InternalServerError
            };

            context.ExceptionHandled = true;
        }
    }

    public class ApiResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? DeveloperMessage { get; set; }
        public object? Data { get; set; }
    }
}