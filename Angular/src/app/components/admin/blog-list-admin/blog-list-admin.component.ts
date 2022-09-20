import { Component, OnInit } from '@angular/core';
import { BlogListDto } from 'src/app/models/blogListDto';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list-admin',
  templateUrl: './blog-list-admin.component.html',
  styleUrls: ['./blog-list-admin.component.css']
})
export class BlogListAdminComponent implements OnInit {

  blogs:BlogListDto[];

  constructor(
    private blogService:BlogService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.blogService.getBlogs(null,null,null).subscribe((res)=>{
      this.blogs=res.result;
    })
  }

  deleteBlog(id:number){
    this.blogService.deleteBlog(id).subscribe(()=>{
      this.getBlogs();
    })
  }

}
