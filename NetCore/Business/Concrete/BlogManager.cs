using Business.Abstract;
using Core.Pagination;
using Core.Utilities.Params;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class BlogManager : IBlogService
    {
        private readonly IBlogDal _blogDal;
        private readonly ICommentDal _commentDal;

        public BlogManager(IBlogDal blogDal, ICommentDal commentDal)
        {
            _blogDal = blogDal;
            _commentDal = commentDal;
        }

        public void AddBlog(BlogAddDto blogDto)
        {
            var blog = new Blog
            {
                CategoryId = blogDto.CategoryId,
                ContentOfPost = blogDto.ContentOfPost,
                MainDescription = blogDto.MainDescription,
                Title = blogDto.Title,
                TitlePhoto = blogDto.TitlePhoto
            };

            _blogDal.Add(blog);
        }

       

        public void DeleteBlog(int id)
        {
            var blog = _blogDal.Get(x => x.Id == id);
            _blogDal.Delete(blog);
        }

        public BlogDto GetBlog(int id)
        {
            return _blogDal.GetBlog(id);
        }

        public PagedList<BlogDto> GetBlogs(BlogParams blogParams)
        {
            var source = _blogDal.GetBlogs();

            if (blogParams.CategoryName != null)
            {
                source = source.Where(x => x.CategoryName.ToLower() == blogParams.CategoryName.ToLower()).ToList();
            }

            if (blogParams.Order!=null)
            {
                source = source.OrderByDescending(x => x.Comments.Count()).Take(blogParams.Order.Value).ToList();
            }

            return PagedList<BlogDto>.Create(source.AsQueryable(), blogParams.PageNumber, blogParams.PageSize);
        }

        public void UpdateBlog(Blog blog)
        {
            _blogDal.Update(blog);
        }
    }
}
