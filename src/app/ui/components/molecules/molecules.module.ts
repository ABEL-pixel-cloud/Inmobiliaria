import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AtomsModule } from '../atoms/atoms.module';
import { FormFieldComponent } from './form-field/form-field.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    AtomsModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    FormFieldComponent
  ]
})
export class MoleculesModule { }