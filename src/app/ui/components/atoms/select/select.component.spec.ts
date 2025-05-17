import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { InputComponent } from '../input/input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule,FormControl } from '@angular/forms';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent,InputComponent],
        imports: [NgSelectModule,ReactiveFormsModule],   
    });

    
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
      component.control = new FormControl('');

    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
