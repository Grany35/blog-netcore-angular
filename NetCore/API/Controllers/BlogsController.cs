using Business.Abstract;
using Core.Extensions;
using Core.Utilities.Params;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogsController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public IActionResult GetBlogs([FromQuery]BlogParams blogParams)
        {
            var blogs = _blogService.GetBlogs(blogParams);

            Response.AddPaginationHeader(blogs.CurrentPage, blogs.PageSize, blogs.TotalCount, blogs.TotalPages);

            return Ok(blogs);
        }


        [HttpGet("{id}")]
        public IActionResult GetBlog(int id)
        {
            var blog = _blogService.GetBlog(id);
            return Ok(blog);
        }

        [HttpPost("addblog")]
        public IActionResult AddBlog(BlogAddDto blog)
        {
            _blogService.AddBlog(blog);
            return NoContent();
        }

        [HttpGet("deleteblog")]
        public IActionResult DeleteBlog(int id)
        {
            _blogService.DeleteBlog(id);
            return NoContent();
        }

        [HttpPost("updateblog")]
        public IActionResult UpdateBlog(Blog blog)
        {
            _blogService.UpdateBlog(blog);
            return NoContent();
        }

        
    }
}
