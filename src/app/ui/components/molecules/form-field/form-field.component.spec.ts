import { OrganismsModule } from 'src/app/ui/components/organisms/organisms.module';
import { AtomsModule } from 'src/app/ui/components/atoms/atoms.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldComponent } from './form-field.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LabelComponent } from '../../atoms/label/label.component';


describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldComponent,LabelComponent],
         imports: [NgSelectModule],   
    });
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
