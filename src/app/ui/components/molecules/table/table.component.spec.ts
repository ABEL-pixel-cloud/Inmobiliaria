import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Category } from 'src/app/core/models/category';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableComponent (Jest)', () => {
  let componente: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const categoriasMock: Category[] = [
    { id: 1, name: 'Categoría 1', description: 'Desc 1' },
    { id: 2, name: 'Categoría 2', description: 'Desc 2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      schemas: [NO_ERRORS_SCHEMA] // evita errores por componentes hijos
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    componente = fixture.componentInstance;
    componente.categories = categoriasMock;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería renderizar las categorías correctamente', () => {
    const compilado = fixture.nativeElement as HTMLElement;
    const filas = compilado.querySelectorAll('tr');
    expect(filas.length).toBeGreaterThan(0); // Asegura que hay filas
  });

 
});