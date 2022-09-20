import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      userName:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let login=Object.assign({},this.loginForm.value);
      this.authService.login(login).subscribe((res)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/admin/addpage');
      })
    }
  }

}
