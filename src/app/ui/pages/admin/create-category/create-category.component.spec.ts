import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategoryComponent } from './create-category.component';

// Mock simple de CategoryListComponent
@Component({
  selector: 'app-category-list',
  template: '' // no renderiza nada
})
class MockCategoryListComponent {}

// Mock simple de CategoryFormComponent
@Component({
  selector: 'app-category-form',
  template: '' // no renderiza nada
})
class MockCategoryFormComponent {}

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateCategoryComponent,
        MockCategoryListComponent,
        MockCategoryFormComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más tests para CreateCategoryComponent aquí, si quieres
});