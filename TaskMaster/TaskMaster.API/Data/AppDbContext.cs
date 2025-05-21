using Microsoft.EntityFrameworkCore;
using TaskMaster.Core.Entities;
using TaskMaster.Infrastructure.Data; // Add this using

namespace TaskMaster.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Task entity
            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.ToTable("Tasks");
                
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                
                entity.Property(e => e.Title)
                      .IsRequired()
                      .HasMaxLength(200);
                
                entity.Property(e => e.Description)
                      .HasMaxLength(1000);
                
                entity.Property(e => e.Status)
                      .IsRequired()
                      .HasConversion<string>()
                      .HasMaxLength(50);
                      
                entity.Property(e => e.Priority)
                      .IsRequired()
                      .HasConversion<string>()
                      .HasMaxLength(50);
                
                entity.Property(e => e.CreatedAt)
                      .IsRequired()
                      .HasDefaultValueSql("GETUTCDATE()");
                
                entity.HasIndex(e => e.Status);
            });
        }
    }
}