import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageAdminComponent } from './components/admin/add-page-admin/add-page-admin.component';
import { BlogListAdminComponent } from './components/admin/blog-list-admin/blog-list-admin.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { LoginComponent } from './components/admin/login/login.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { LayoutBlogComponent } from './components/blog/layout-blog/layout-blog.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',component: LayoutBlogComponent,children:[
      {path:'blog/:id',component:BlogDetailComponent}
    ]
  },
  {path:'',component:LayoutAdminComponent,children:[
    {path:'admin/addpage',component:AddPageAdminComponent,canActivate:[AuthGuard]},
    {path:'admin/bloglist',component:BlogListAdminComponent,canActivate:[AuthGuard]}
  ]},
  {path:'login',component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
