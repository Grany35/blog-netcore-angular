import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }


  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }
  }

  login(login:LoginModel){
    let api=this.apiUrl+'Auth/login';
    return this.httpClient.post<TokenModel>(api,login)
  }



}
