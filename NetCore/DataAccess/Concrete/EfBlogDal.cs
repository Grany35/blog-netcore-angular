using Core.DataAccess;
using DataAccess.Abstract;
using DataAccess.Concrete.Context;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class EfBlogDal : EfEntityBase<Blog, ContextDb>, IBlogDal
    {
        public BlogDto GetBlog(int id)
        {
            using (var context = new ContextDb())
            {
                var blog = from blogd in context.Blogs.Where(x => x.Id == id)
                           join category in context.Categories on blogd.CategoryId equals category.Id
                           select new BlogDto
                           {
                               CategoryId = category.Id,
                               CategoryName = category.CategoryName,
                               ContentOfPost = blogd.ContentOfPost,
                               Comments = blogd.Comments,
                               Id = blogd.Id,
                               AddedAt = blogd.AddedAt,
                               MainDescription = blogd.MainDescription,
                               Title = blogd.Title,
                               TitlePhoto = blogd.TitlePhoto
                           };
                return blog.FirstOrDefault();
            }
        }

        public List<BlogDto> GetBlogs()
        {
            using (var context = new ContextDb())
            {
                var query = (from blog in context.Blogs
                             join category in context.Categories on blog.CategoryId equals category.Id
                             select new BlogDto
                             {
                                 CategoryId = category.Id,
                                 CategoryName = category.CategoryName,
                                 ContentOfPost = blog.ContentOfPost,
                                 Comments = blog.Comments,
                                 Id = blog.Id,
                                 MainDescription = blog.MainDescription,
                                 Title = blog.Title,
                                 AddedAt=blog.AddedAt,
                                 TitlePhoto = blog.TitlePhoto
                             }).AsNoTracking();
                return query.OrderByDescending(x=>x.AddedAt).ToList();
            }
        }
    }
}
