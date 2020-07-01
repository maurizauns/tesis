using System.Collections.Generic;
namespace UniOdonto.Models.Filters
{
    interface IFilter
    {
        IEnumerable<FieldFilter> Filters { get; } 
    }
}
