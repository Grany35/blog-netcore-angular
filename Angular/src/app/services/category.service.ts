import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CategoryModel } from '../models/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getCategories(){
    let api=this.apiUrl+'categories';
    return this.httpClient.get<CategoryModel[]>(api);
  }

  addCategory(category:CategoryModel){
    let api=this.apiUrl+'categories/addcategory';
    return this.httpClient.post(api,category);
  }

  deleteCategory(id:number){
    let api=this.apiUrl+'categories/deletecategory?id='+id;
    return this.httpClient.get(api);
  }
}
