import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject, throwError } from 'rxjs';
import { CreateLocationComponent } from './create-location.component';
import { CityService } from 'src/app/core/services/ubicationService/city.service';
import { LocationService } from 'src/app/core/services/ubicationService/location.service';
import { ToastrService } from 'ngx-toastr';
import { LocationEventService } from 'src/app/core/services/ubicationService/locationEvent.service';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { OrganismsModule } from '../organisms.module';

describe('CreateLocationComponent', () => {
  let component: CreateLocationComponent;
  let fixture: ComponentFixture<CreateLocationComponent>;

  let mockCityService: any;
  let mockLocationService: any;
  let mockToastr: any;
  let mockLocationEventService: any;
  let cityCreatedSubject: Subject<void>;

  beforeEach(async () => {
    cityCreatedSubject = new Subject<void>();

    mockCityService = {
      getCities: jest.fn().mockReturnValue(of([{ id: 1, name: 'City 1' }]))
    };

    mockLocationService = {
      postLocation: jest.fn()
    };

    mockToastr = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockLocationEventService = {
      cityCreated$: cityCreatedSubject,
    };

    await TestBed.configureTestingModule({
      declarations: [CreateLocationComponent],
      imports: [ReactiveFormsModule, AtomsModule, MoleculesModule, OrganismsModule],
      providers: [
        FormBuilder,
        { provide: CityService, useValue: mockCityService },
        { provide: LocationService, useValue: mockLocationService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: LocationEventService, useValue: mockLocationEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cities on init', () => {
    expect(mockCityService.getCities).toHaveBeenCalled();
    expect(component.cities.length).toBe(1);
  });

  it('should reload cities when cityCreated$ emits', fakeAsync(() => {
    const loadCitiesSpy = jest.spyOn(component as any, 'loadCities');
    cityCreatedSubject.next();
    tick();
    expect(loadCitiesSpy).toHaveBeenCalled();
  }));

  it('should show error toastr when getCities fails', () => {
    mockCityService.getCities.mockReturnValueOnce(throwError(() => new Error('Error')));
    component['loadCities']();
    expect(mockToastr.error).toHaveBeenCalledWith('Error al cargar ciudades');
  });

  it('should not call postLocation if form is invalid', () => {
    component.createLocation();
    expect(mockLocationService.postLocation).not.toHaveBeenCalled();
    expect(component.locationform.touched).toBeTruthy();
  });

  it('should call postLocation and show success toastr on success', () => {
    component.locationform.setValue({ name: 'Barrio 1', city: 1 });
    mockLocationService.postLocation.mockReturnValue(of({}));

    component.createLocation();

    expect(mockLocationService.postLocation).toHaveBeenCalledWith({
      barrio: 'Barrio 1',
      city: 1
    });

    expect(mockToastr.success).toHaveBeenCalledWith('Ubicacion  creada exitosamente');
    expect(component.locationform.pristine).toBe(true);
  });

  it('should show error toastr on postLocation error', () => {
    component.locationform.setValue({ name: 'Barrio 1', city: 1 });
    const error = new Error('Error al crear');
    mockLocationService.postLocation.mockReturnValue(throwError(() => error));

    component.createLocation();

    expect(mockToastr.error).toHaveBeenCalledWith('Error al crear');
  });
});