
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './ui/pages/admin/create-category/create-category.component';
import { AdminLayoutComponent } from './ui/components/layuouts/admin-layout/admin-loyout.component';
import { DashboardComponent } from './ui/pages/admin/dashboard/dashboard.component';
import { CreateUbicationComponent } from './ui/pages/admin/create-ubication/create-ubication.component';
import { CreateUsersComponent } from './ui/pages/admin/create-users/create-users.component';
import { SellerLayoutComponent } from './ui/components/layuouts/seller-layout/seller-layout.component';
import { CreatePublishHomesComponent } from './ui/pages/seller/create-publish-homes/create-publish-homes.component';


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
      { path: 'create-users', component: CreateUsersComponent },
    ]
  },
  {
    path: 'seller',
    component: SellerLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-publish-homes', component: CreatePublishHomesComponent },
      // Aquí puedes agregar más rutas específicas para vendedores
    ]
  },
   
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

