using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CategoryManager : ICategoryService
    {
        private readonly ICategoryDal _categoryDal;

        public CategoryManager(ICategoryDal categoryDal)
        {
            _categoryDal = categoryDal;
        }

        public void AddCategory(Category category)
        {
            _categoryDal.Add(category);
        }

        public void DeleteCategory(int id)
        {
            var category = _categoryDal.Get(x => x.Id == id);
            _categoryDal.Delete(category);
        }

        public List<Category> GetCategories()
        {
            return new List<Category>(_categoryDal.GetAll());
        }

        public void UpdateCategory(Category category)
        {
            _categoryDal.Update(category);
        }
    }
}
