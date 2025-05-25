import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './ui/pages/admin/create-category/create-category.component';
import { AdminLayoutComponent } from './ui/components/layuouts/admin-layout/admin-loyout.component';
import { DashboardComponent } from './ui/pages/admin/dashboard/dashboard.component';
import { CreateUbicationComponent } from './ui/pages/admin/create-ubication/create-ubication.component';
import { CreateUserComponent } from './ui/components/organisms/create-user/create-user.component';
import { SellerLayoutComponent } from './ui/components/layuouts/seller-layout/seller-layout.component';
import { CreatePublishHomeComponent } from './ui/components/organisms/create-publish-home/create-publish-home.component';

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
  {
    path: 'seller',
    component: SellerLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-publish-home', component: CreatePublishHomeComponent },
      // Aquí puedes agregar más rutas específicas para vendedores
    ]
  },
  // 404 opcional
  {
    path: '**',
    redirectTo: 'admin/dashboard'
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

