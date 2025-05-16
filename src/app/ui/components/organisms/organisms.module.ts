import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AtomsModule } from '../atoms/atoms.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { MoleculesModule } from "../molecules/molecules.module";





@NgModule({
  declarations: [
  
    CategoryFormComponent,
    CategoryListComponent,
  
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AtomsModule,
    MoleculesModule
],
  exports: [
    CategoryFormComponent,
    CategoryListComponent,
  ]
 
})
export class OrganismsModule { }