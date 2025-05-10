import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismsComponent } from './organisms.component';

describe('OrganismsComponent', () => {
  let component: OrganismsComponent;
  let fixture: ComponentFixture<OrganismsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganismsComponent]
    });
    fixture = TestBed.createComponent(OrganismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
