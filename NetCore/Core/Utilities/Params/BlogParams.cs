using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Params
{
    public class BlogParams : PaginationParams
    {
        public string? CategoryName { get; set; }
        public int? Order { get; set; }
    }
}
