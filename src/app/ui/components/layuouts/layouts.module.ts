import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-loyout.component'; 
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';
import { OrganismsModule } from '../organisms/organisms.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    SellerLayoutComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule
  ],
  exports: [
    AdminLayoutComponent,
    SellerLayoutComponent
  ]
})
export class LayoutsModule { }