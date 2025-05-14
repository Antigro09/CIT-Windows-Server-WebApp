using System.Linq.Expressions;
using TaskMaster.Core.Interfaces;

namespace TaskMaster.Core.Specifications
{
    /// <summary>
    /// Base specification implementation
    /// </summary>
    /// <typeparam name="T">Entity type</typeparam>
    public abstract class BaseSpecification<T> : ISpecification<T>
    {
        /// <summary>
        /// Criteria expression
        /// </summary>
        public Expression<Func<T, bool>> Criteria { get; }
        
        /// <summary>
        /// Include expressions for eager loading
        /// </summary>
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();
        
        /// <summary>
        /// String-based include statements
        /// </summary>
        public List<string> IncludeStrings { get; } = new List<string>();
        
        /// <summary>
        /// Order by expression
        /// </summary>
        public Expression<Func<T, object>>? OrderBy { get; private set; }
        
        /// <summary>
        /// Order by descending expression
        /// </summary>
        public Expression<Func<T, object>>? OrderByDescending { get; private set; }
        
        /// <summary>
        /// Take count for pagination
        /// </summary>
        public int Take { get; private set; }
        
        /// <summary>
        /// Skip count for pagination
        /// </summary>
        public int Skip { get; private set; }
        
        /// <summary>
        /// Whether pagination is enabled
        /// </summary>
        public bool IsPagingEnabled { get; private set; }

        /// <summary>
        /// Constructor with criteria
        /// </summary>
        /// <param name="criteria">Filter criteria</param>
        protected BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        /// <summary>
        /// Default constructor
        /// </summary>
        protected BaseSpecification()
        {
            Criteria = _ => true;
        }

        /// <summary>
        /// Add include expression
        /// </summary>
        /// <param name="includeExpression">Include expression</param>
        protected virtual void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        /// <summary>
        /// Add string-based include
        /// </summary>
        /// <param name="includeString">Include string</param>
        protected virtual void AddInclude(string includeString)
        {
            IncludeStrings.Add(includeString);
        }

        /// <summary>
        /// Apply paging
        /// </summary>
        /// <param name="skip">Items to skip</param>
        /// <param name="take">Items to take</param>
        protected virtual void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }

        /// <summary>
        /// Apply ordering
        /// </summary>
        /// <param name="orderByExpression">Order by expression</param>
        protected virtual void ApplyOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }

        /// <summary>
        /// Apply descending ordering
        /// </summary>
        /// <param name="orderByDescendingExpression">Order by descending expression</param>
        protected virtual void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescendingExpression)
        {
            OrderByDescending = orderByDescendingExpression;
        }
    }
}