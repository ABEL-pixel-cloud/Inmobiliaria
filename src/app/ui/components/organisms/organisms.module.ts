import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AtomsModule } from '../atoms/atoms.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { MoleculesModule } from "../molecules/molecules.module";
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { CreateCityComponent } from './create-city/create-city.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { UbicationListComponent } from './ubication-list/ubication-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreatePublishHomeComponent } from './create-publish-home/create-publish-home.component';





@NgModule({
  declarations: [
  
    CategoryFormComponent,
    CategoryListComponent,
    CreateDepartmentComponent,
    CreateCityComponent,
    CreateLocationComponent,
    UbicationListComponent,
    CreateUserComponent,
    CreatePublishHomeComponent,
  
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
    CreateDepartmentComponent,
    CreateCityComponent,
    CreateLocationComponent,
    UbicationListComponent,
    CreateUserComponent,
    CreatePublishHomeComponent,
  ]
 
})
export class OrganismsModule { }