import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayuoutsComponent } from './layuouts.component';

describe('LayuoutsComponent', () => {
  let component: LayuoutsComponent;
  let fixture: ComponentFixture<LayuoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayuoutsComponent]
    });
    fixture = TestBed.createComponent(LayuoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
