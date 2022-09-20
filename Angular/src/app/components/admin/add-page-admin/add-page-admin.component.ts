import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Editor, NgxEditorConfig, Toolbar, Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/models/categoryModel';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-add-page-admin',
  templateUrl: './add-page-admin.component.html',
  styleUrls: ['./add-page-admin.component.css']
})
export class AddPageAdminComponent implements OnInit,OnDestroy {

  editor: Editor;
  html: '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  

  blogAddForm:FormGroup;
  categoryAddForm:FormGroup;

  categories:CategoryModel[];

  constructor(
    private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private blogService:BlogService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.createBlogAddForm();
    this.getCategories();
    this.createCategoryAddForm();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  addBlog(){
    if (this.blogAddForm.valid) {
      let blog=Object.assign({},this.blogAddForm.value)
      this.blogService.addBlog(blog).subscribe(()=>{
        this.toastr.success("Blog Eklendi...");
      },err=>{
        this.toastr.error(err);
      })
    }
  }

  createBlogAddForm(){
    this.blogAddForm=this.formBuilder.group({
      title:["",Validators.required],
      titlePhoto:["",Validators.required],
      mainDescription:["",Validators.required],
      contentOfPost:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((res)=>{
      this.categories=res;
    })
  } 

  createCategoryAddForm(){
    this.categoryAddForm=this.formBuilder.group({
      categoryName:["",Validators.required]
    })
  }
  
  addCategory(){
    if (this.categoryAddForm.valid) {
      let category=Object.assign({},this.categoryAddForm.value);
      this.categoryService.addCategory(category).subscribe(()=>{
        this.getCategories();
        this.toastr.success("Kategori Eklendi...");
        this.createCategoryAddForm();
      })
    }
  }

  deleteCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe(()=>{
      this.getCategories();
    })
  }

  cancelBlog(){
    this.createBlogAddForm();
  }

  cancelCategory(){
    this.createCategoryAddForm();
  }



  

}
