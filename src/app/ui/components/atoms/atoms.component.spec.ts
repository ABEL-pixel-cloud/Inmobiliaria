import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomsComponent } from './atoms.component';

describe('AtomsComponent', () => {
  let component: AtomsComponent;
  let fixture: ComponentFixture<AtomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtomsComponent]
    });
    fixture = TestBed.createComponent(AtomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
