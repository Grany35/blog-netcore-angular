import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { LayoutBlogComponent } from './components/blog/layout-blog/layout-blog.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { AddPageAdminComponent } from './components/admin/add-page-admin/add-page-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { BlogListAdminComponent } from './components/admin/blog-list-admin/blog-list-admin.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/admin/login/login.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
    LayoutAdminComponent,
    LayoutBlogComponent,
    BlogDetailComponent,
    AddPageAdminComponent,
    BlogListAdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    NgxEditorModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide:'apiUrl',useValue:'https://localhost:7241/api/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
