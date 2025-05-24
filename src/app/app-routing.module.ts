import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './ui/pages/admin/create-category/create-category.component';
import { AdminLayoutComponent } from './ui/components/layuouts/admin-layout/admin-loyout.component';
import { DashboardComponent } from './ui/pages/admin/dashboard/dashboard.component';
import { CreateUbicationComponent } from './ui/pages/admin/create-ubication/create-ubication.component';
import { CreateUserComponent } from './ui/components/organisms/create-user/create-user.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'create-category', component: CreateCategoryComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-ubication', component: CreateUbicationComponent },
      { path: 'create-user', component: CreateUserComponent },
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

