

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './admin/create-category/create-category.component';
import { AtomsModule } from '../components/atoms/atoms.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OrganismsModule } from '../components/organisms/organisms.module';
import { MoleculesModule } from '../components/molecules/molecules.module';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CreateUbicationComponent } from './admin/create-ubication/create-ubication.component';
import { CreateUsersComponent } from './admin/create-users/create-users.component';
import { CreatePublishHomesComponent } from './seller/create-publish-homes/create-publish-homes.component';











@NgModule({
  declarations: [
    CreateCategoryComponent,
    DashboardComponent,
    CreateUbicationComponent,
    CreateUsersComponent,
    CreatePublishHomesComponent,
  
    
    
  
  ],
  imports: [
    CommonModule,
    AtomsModule,
    OrganismsModule,
    FormsModule,
    ReactiveFormsModule,
    MoleculesModule
  ],
   exports: [
    CreateCategoryComponent,

   ]
})
export class PagesModule { }