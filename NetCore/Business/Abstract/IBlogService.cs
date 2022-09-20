using Core.Pagination;
using Core.Utilities.Params;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IBlogService
    {
        PagedList<BlogDto> GetBlogs(BlogParams blogParams);
        void AddBlog(BlogAddDto blogDto);
        void UpdateBlog(Blog blog);
        void DeleteBlog(int id);
        BlogDto GetBlog(int id);
        
    }
}
