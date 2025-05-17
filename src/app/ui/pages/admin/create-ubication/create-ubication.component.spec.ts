import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { CreateUbicationComponent } from './create-ubication.component';
import { CreateCityComponent } from 'src/app/ui/components/organisms/create-city/create-city.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateDepartmentComponent } from 'src/app/ui/components/organisms/create-department/create-department.component';
import { AtomsModule } from 'src/app/ui/components/atoms/atoms.module';
import { OrganismsModule } from 'src/app/ui/components/organisms/organisms.module';
import { MoleculesModule } from 'src/app/ui/components/molecules/molecules.module';

describe('CreateUbicationComponent', () => {
  let component: CreateUbicationComponent;
  let fixture: ComponentFixture<CreateUbicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUbicationComponent,CreateCityComponent,CreateDepartmentComponent],
        imports: [ ToastrModule.forRoot(),HttpClientTestingModule,AtomsModule,OrganismsModule,MoleculesModule       ],
    });
    fixture = TestBed.createComponent(CreateUbicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
