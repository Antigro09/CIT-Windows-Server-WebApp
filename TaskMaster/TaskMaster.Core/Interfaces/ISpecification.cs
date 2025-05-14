using System.Linq.Expressions;

namespace TaskMaster.Core.Interfaces
{
    /// <summary>
    /// Specification pattern interface for query specifications
    /// </summary>
    /// <typeparam name="T">Entity type</typeparam>
    public interface ISpecification<T>
    {
        /// <summary>
        /// Criteria expression
        /// </summary>
        Expression<Func<T, bool>> Criteria { get; }
        
        /// <summary>
        /// Include expressions for eager loading
        /// </summary>
        List<Expression<Func<T, object>>> Includes { get; }
        
        /// <summary>
        /// String-based include statements
        /// </summary>
        List<string> IncludeStrings { get; }
        
        /// <summary>
        /// Order by expression
        /// </summary>
        Expression<Func<T, object>>? OrderBy { get; }
        
        /// <summary>
        /// Order by descending expression
        /// </summary>
        Expression<Func<T, object>>? OrderByDescending { get; }
        
        /// <summary>
        /// Take count for pagination
        /// </summary>
        int Take { get; }
        
        /// <summary>
        /// Skip count for pagination
        /// </summary>
        int Skip { get; }
        
        /// <summary>
        /// Whether pagination is enabled
        /// </summary>
        bool IsPagingEnabled { get; }
    }
}