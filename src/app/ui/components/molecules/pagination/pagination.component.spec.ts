import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { CategoryResponse } from 'src/app/core/models/category';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SimpleChanges } from '@angular/core';

describe('Componente Paginación', () => {
  let componente: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  // Nota: currentPage es 0-based en tu código, así que lo inicializo en 0
  const crearMockPaginacion = (override: Partial<CategoryResponse> = {}): CategoryResponse => ({
    categories: [],
    currentPage: 0,
    totalPages: 5,
    totalElements: 20,
    pageSize: 5,
    hasNext: true,
    hasPrevious: false,
    ...override
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [PaginationComponent, ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    componente = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    componente.pagination = crearMockPaginacion();
    fixture.detectChanges();
    expect(componente).toBeTruthy();
  });
  it('no debería actualizar visiblePages si pagination es undefined', () => {
  componente.pagination = undefined as any; // o null
  componente.updateVisiblePages();
  expect(componente.visiblePages.length).toBe(0);
});

  it('debería emitir el número de página correcto al llamar a goToPage()', () => {
    componente.pagination = crearMockPaginacion({ currentPage: 1 }); // Segunda página (0-based)
    fixture.detectChanges();

    jest.spyOn(componente.pageChanged, 'emit');

    componente.goToPage(3); // página 3 (1-based)
    expect(componente.pageChanged.emit).toHaveBeenCalledWith(2); // base 0
  });

  it('no debería emitir si goToPage está fuera de los límites', () => {
    componente.pagination = crearMockPaginacion({ currentPage: 1 });
    fixture.detectChanges();

    jest.spyOn(componente.pageChanged, 'emit');

    componente.goToPage(0); // inválido
    componente.goToPage(6); // fuera del totalPages = 5
    expect(componente.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('debería emitir página anterior si hasPrevious es verdadero', () => {
    componente.pagination = crearMockPaginacion({ currentPage: 1, hasPrevious: true });
    fixture.detectChanges();

    jest.spyOn(componente.pageChanged, 'emit');

    componente.previousPage();
    expect(componente.pageChanged.emit).toHaveBeenCalledWith(0);
  });

  it('no debería emitir página anterior si hasPrevious es falso', () => {
    componente.pagination = crearMockPaginacion({ currentPage: 0, hasPrevious: false });
    fixture.detectChanges();

    jest.spyOn(componente.pageChanged, 'emit');

    componente.previousPage();
    expect(componente.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('debería emitir página siguiente si hasNext es verdadero', () => {
    componente.pagination = crearMockPaginacion({ currentPage: 1, hasNext: true });
    fixture.detectChanges();

    jest.spyOn(componente.pageChanged, 'emit');

    componente.nextPage();
    expect(componente.pageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('no debería emitir página siguiente si hasNext es falso', () => {
    componente.pagination = crearMockPaginacion({ currentPage: 4, hasNext: false });
    fixture.detectChanges();

    jest.spyOn(componente.pageChanged, 'emit');

    componente.nextPage();
    expect(componente.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('debería actualizar las páginas visibles correctamente cuando cambia la paginación', () => {
    const mock = crearMockPaginacion({ currentPage: 2, totalPages: 10 }); // currentPage = 2 (tercera página)
    componente.pagination = mock;

    const changes: SimpleChanges = {
      pagination: {
        currentValue: mock,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      }
    };

    componente.ngOnChanges(changes);

    expect(componente.visiblePages.length).toBeGreaterThan(0);
    // El array visiblePages está basado en 1-based pages, así que debe contener 3 (2 + 1)
    expect(componente.visiblePages).toContain(3);
  });
});