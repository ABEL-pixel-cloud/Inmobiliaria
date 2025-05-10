import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculesComponent } from './molecules.component';

describe('MoleculesComponent', () => {
  let component: MoleculesComponent;
  let fixture: ComponentFixture<MoleculesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoleculesComponent]
    });
    fixture = TestBed.createComponent(MoleculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
