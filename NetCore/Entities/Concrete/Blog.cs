using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitlePhoto { get; set; }
        public string MainDescription { get; set; }
        public string ContentOfPost { get; set; }
        public int CategoryId { get; set; }
        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Comment> Comments { get; set; }
    }

}
