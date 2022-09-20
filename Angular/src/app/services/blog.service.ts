import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { BlogListDto } from '../models/blogListDto';
import { BlogModel } from '../models/blogModel';
import { CommentModel } from '../models/commentModel';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  categoryName: string = "";

  paginatedResult:PaginatedResult<BlogListDto[]>=new PaginatedResult<BlogListDto[]>();

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  addBlog(blog:BlogModel){
    let api=this.apiUrl+'blogs/addblog';
    return this.httpClient.post(api,blog);
  }

  getBlogs(pageNumber?: number, pageSize?: number,categoryName?:string){
    let params=new HttpParams();

    if (pageNumber !== null && pageSize !== null) {
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    }

    if (categoryName!==null) {
      params=params.append('categoryName',categoryName);
    }

    return this.httpClient.get<BlogListDto[]>(this.apiUrl+'blogs',{observe:'response',params}).pipe(
      map(response=>{
        this.paginatedResult.result=response.body;
        if (response.headers.get('Pagination')!==null) {
          this.paginatedResult.pagination=JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    )
  }

  
  getBlog(id:string){
    let api=this.apiUrl+'blogs/'+id;
    return this.httpClient.get<BlogListDto>(api);
  }

  deleteBlog(id:number){
    let api=this.apiUrl+'blogs/deleteblog?id='+id;
    return this.httpClient.get(api);
  }

  addComment(comment:CommentModel){
    let api=this.apiUrl+'comments/addcomment';
    return this.httpClient.post(api,comment);
  }

  getOrderedBlogs(order:number){
    let api=this.apiUrl+'blogs?order='+order;
    return this.httpClient.get<BlogListDto[]>(api);
  }

  
}
