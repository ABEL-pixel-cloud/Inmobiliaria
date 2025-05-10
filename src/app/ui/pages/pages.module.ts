

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './admin/create-category/create-category.component';
import { AtomsModule } from '../components/atoms/atoms.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OrganismsModule } from '../components/organisms/organisms.module';





@NgModule({
  declarations: [
    CreateCategoryComponent,
  ],
  imports: [
    CommonModule,
    AtomsModule,
    OrganismsModule,
    FormsModule,
    ReactiveFormsModule
  ],
   exports: [
    CreateCategoryComponent,
   ]
})
export class PagesModule { }