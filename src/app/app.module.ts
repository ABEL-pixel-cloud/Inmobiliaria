
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtomsModule } from './ui/components/atoms/atoms.module';
import { MoleculesModule } from './ui/components/molecules/molecules.module';
import { OrganismsModule } from './ui/components/organisms/organisms.module';
import { ToastrModule } from 'ngx-toastr';
import { LayoutsModule } from './ui/components/layuouts/layouts.module';
import { PagesModule } from './ui/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganismsComponent } from './ui/components/organisms/organisms.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AtomsComponent } from './ui/components/atoms/atoms.component';


@NgModule({
  declarations: [
    AppComponent,
    AtomsComponent,
    OrganismsComponent,
    OrganismsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    ToastrModule.forRoot(),
    LayoutsModule,
    PagesModule,
    BrowserAnimationsModule,
    NgSelectModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
