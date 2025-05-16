import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './ui/pages/admin/create-category/create-category.component';
import { AdminLayoutComponent } from './ui/components/layuouts/admin-layout/admin-loyout.component';
import { DashboardComponent } from './ui/pages/admin/dashboard/dashboard.component';


const routes: Routes = [
    {
  path: '',
  component: AdminLayoutComponent, // Este es tu layout
  children: [
    {
      path: 'create-category',
      component: CreateCategoryComponent // Esta es la page que contiene <app-category-form>
    },
     {
      path: 'dashboard',
      component: DashboardComponent // Esta es la page que contiene <app-category-form>
    },
  
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
