import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { of, throwError, Subject } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { MoleculesModule } from '../../molecules/molecules.module';
import { CategoryEventService } from 'src/app/core/services/categoryevent.service';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let mockCategoryService: any;
  let mockCategoryEventService: any;

  const PAGE_SIZE = 10;

  const mockResponse = {
    categories: [
      { name: 'Categoría 1', description: 'Desc 1' },
      { name: 'Categoría 2', description: 'Desc 2' },
    ] as Category[],
    totalPages: 3,
    currentPage: 0,
  };

  beforeEach(async () => {
    mockCategoryService = {
      getCategories: jest.fn().mockReturnValue(of(mockResponse))
    };

    mockCategoryEventService = {
      categoryCreated$: new Subject<void>()
    };

    await TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [MoleculesModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: CategoryEventService, useValue: mockCategoryEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar categorías al iniciar (ngOnInit)', () => {
    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(0, PAGE_SIZE, true);
    expect(component.categories.length).toBe(2);
    expect(component.totalPages).toBe(3);
    expect(component.currentPage).toBe(0);
  });

  it('debería volver a cargar categorías si se notifica un nuevo evento', () => {
    const spy = jest.spyOn(component, 'loadCategories');
    mockCategoryEventService.categoryCreated$.next();
    expect(spy).toHaveBeenCalled();
  });

  it('debería cambiar de página con nextPage()', () => {
    component.currentPage = 0;
    component.totalPages = 3;
    const spy = jest.spyOn(component, 'loadCategories');

    component.nextPage();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('no debería hacer nada si nextPage() se llama en la última página', () => {
    component.currentPage = 2;
    component.totalPages = 3;
    const spy = jest.spyOn(component, 'loadCategories');

    component.nextPage();

    expect(spy).not.toHaveBeenCalled();
  });

  it('debería cambiar de página con previousPage()', () => {
    component.currentPage = 2;
    const spy = jest.spyOn(component, 'loadCategories');

    component.previousPage();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('no debería hacer nada si previousPage() se llama en la primera página', () => {
    component.currentPage = 0;
    const spy = jest.spyOn(component, 'loadCategories');

    component.previousPage();

    expect(spy).not.toHaveBeenCalled();
  });

  it('debería manejar errores al cargar categorías', fakeAsync(() => {
    mockCategoryService.getCategories.mockReturnValueOnce(
      throwError(() => new Error('Error de red'))
    );

    component.loadCategories(0);
    tick();

    expect(component.errorMessage).toBe('Ocurrió un error al cargar las categorías. Intenta nuevamente.');
  }));
});