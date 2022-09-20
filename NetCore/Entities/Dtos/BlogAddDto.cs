using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class BlogAddDto
    {
        public string Title { get; set; }
        public string TitlePhoto { get; set; }
        public string MainDescription { get; set; }
        public string ContentOfPost { get; set; }
        public int CategoryId { get; set; }
    }
}
