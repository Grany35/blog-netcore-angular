import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogListDto } from 'src/app/models/blogListDto';
import { CategoryModel } from 'src/app/models/categoryModel';
import { Pagination } from 'src/app/models/pagination';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-layout-blog',
  templateUrl: './layout-blog.component.html',
  styleUrls: ['./layout-blog.component.css']
})
export class LayoutBlogComponent implements OnInit {


  blogs:BlogListDto[];
  pageNumber=1;
  pageSize=5;
  
  pagination:Pagination;
  categories:CategoryModel[];

  orderedBlogs:BlogListDto[];

  constructor(
    private categoryService:CategoryService,
    private blogService:BlogService,    
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getOrderedBlgs();
    this.getBlogs();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((res)=>{
      this.categories=res;
    })
  }

  setCategoryName(name: string){
    this.blogService.categoryName = name;
  }

  
  getOrderedBlgs(){
    this.blogService.getOrderedBlogs(3).subscribe((res)=>{
      this.orderedBlogs=res;
    })
  }

  getBlogs(categoryName:string=null){
    this.blogService.getBlogs(this.pageNumber,this.pageSize,categoryName).subscribe((res)=>{
      this.blogs = res.result;
      this.pagination=res.pagination;
      console.log(res);
    })
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.getBlogs();
  }

  deneme(number:number):boolean{
    if (this.router.url=='/'+number) {
      return true;
      
    }else{
      return false;
    }
  }

  goToHome(){
    this.router.navigateByUrl('/');
  }
  

}
