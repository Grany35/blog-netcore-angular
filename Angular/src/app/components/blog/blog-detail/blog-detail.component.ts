import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Validators } from 'ngx-editor';
import { BlogListDto } from 'src/app/models/blogListDto';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog:BlogListDto;

  commentAddForm:FormGroup;

  constructor(
    private blogService:BlogService,
    private activeRoute:ActivatedRoute,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.createCommentAdForm();
  }

  getBlog(){
    this.blogService.getBlog(this.activeRoute.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.blog=res;
      console.log(res);
    })
  }

  createCommentAdForm(){
    this.commentAddForm=this.formBuilder.group({
      name:["",Validators.required],
      blogId:[],
      message:["",Validators.required]
    })
  }

  

  addComment(){
    if (this.commentAddForm.valid) {
      let comment=Object.assign({},this.commentAddForm.value);
      console.log(comment);
      this.blogService.addComment(comment).subscribe((res)=>{
        console.log(res);
      })
    }
  }



}
