

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './admin/create-category/create-category.component';
import { AtomsModule } from '../components/atoms/atoms.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OrganismsModule } from '../components/organisms/organisms.module';
import { MoleculesModule } from '../components/molecules/molecules.module';
import { DashboardComponent } from './admin/dashboard/dashboard.component';






@NgModule({
  declarations: [
    CreateCategoryComponent,
    DashboardComponent,
 
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