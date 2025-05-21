// filepath: c:\Projects\CIT-Windows-Server-WebApp\TaskMaster\TaskMaster.Infrastructure\Data\IAppDbContext.cs
using Microsoft.EntityFrameworkCore;
using TaskMaster.Core.Entities; // Assuming TaskItem is defined here

namespace TaskMaster.Infrastructure.Data
{
    public interface IAppDbContext
    {
        DbSet<TaskItem> Tasks { get; set; }
        // Add DbSets for your other entities here, e.g.:
        // DbSet<OtherEntity> OtherEntities { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        // You can add other DbContext methods if your repositories use them directly,
        // for example, if you need access to ChangeTracker or Database properties from the interface.
    }
}