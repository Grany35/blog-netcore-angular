using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            return Ok(_categoryService.GetCategories());
        }

        [HttpPost("addcategory")]
        public IActionResult AddCategory(Category category)
        {
            _categoryService.AddCategory(category);
            return NoContent();
        }

        [HttpGet("deletecategory")]
        public IActionResult DeleteCategory(int id)
        {
            _categoryService.DeleteCategory(id);
            return NoContent();
        }

        [HttpPost("updatecategory")]
        public IActionResult UpdateCategory(Category category)
        {
            _categoryService.UpdateCategory(category);
            return NoContent();
        }
    }
}
