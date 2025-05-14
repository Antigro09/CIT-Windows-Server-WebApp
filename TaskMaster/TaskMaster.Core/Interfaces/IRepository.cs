namespace TaskMaster.Core.Interfaces
{
    /// <summary>
    /// Generic repository interface for data access
    /// </summary>
    /// <typeparam name="T">Entity type</typeparam>
    public interface IRepository<T> where T : class
    {
        /// <summary>
        /// Gets all entities
        /// </summary>
        IQueryable<T> GetAll();
        
        /// <summary>
        /// Gets entity by id
        /// </summary>
        Task<T?> GetByIdAsync(int id);
        
        /// <summary>
        /// Adds entity
        /// </summary>
        Task<T> AddAsync(T entity);
        
        /// <summary>
        /// Updates entity
        /// </summary>
        Task UpdateAsync(T entity);
        
        /// <summary>
        /// Deletes entity
        /// </summary>
        Task DeleteAsync(T entity);
        
        /// <summary>
        /// Saves changes to database
        /// </summary>
        Task<bool> SaveChangesAsync();
    }
}