import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { CreateUserComponent } from './create-user.component';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { ToastrService } from 'ngx-toastr';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { OrganismsModule } from '../organisms.module';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  let mockUserService: any;
  let mockToastr: any;

  beforeEach(async () => {
    mockUserService = {
      createUser: jest.fn()
    };

    mockToastr = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [ReactiveFormsModule, AtomsModule, MoleculesModule, OrganismsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService },
        { provide: ToastrService, useValue: mockToastr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debería ser inválido cuando está vacío', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('debería validar correctamente el campo nombre', () => {
    const nameControl = component.name;
    nameControl.setValue('');
    expect(nameControl.hasError('required')).toBeTruthy();

    nameControl.setValue('A'.repeat(51)); // suponiendo que MAX_NAME_LENGTH < 51
    expect(nameControl.hasError('maxlength')).toBeTruthy();

    nameControl.setValue('John123'); // patrón inválido (solo letras y espacios)
    expect(nameControl.hasError('pattern')).toBeTruthy();

    nameControl.setValue('John');
    expect(nameControl.valid).toBeTruthy();
  });

  it('debería validar la edad mínima en la fecha de nacimiento', () => {
    const birthdateControl = component.birthdate;

    const hoy = new Date();
    const fechaMenorEdad = new Date(hoy.getFullYear() - 10, hoy.getMonth(), hoy.getDate()).toISOString();
    birthdateControl.setValue(fechaMenorEdad);
    expect(birthdateControl.hasError('underage')).toBeTruthy();

    const fechaEdadExacta = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate()).toISOString();
    birthdateControl.setValue(fechaEdadExacta);
    expect(birthdateControl.hasError('underage')).toBeFalsy();
  });

  describe('blockNonNumeric', () => {
    it('debería prevenir teclas inválidas en el campo documento', () => {
      const teclasInvalidas = ['e', 'E', '+', '-', '.'];
      teclasInvalidas.forEach(key => {
        const event = new KeyboardEvent('keydown', { key });
        jest.spyOn(event, 'preventDefault');
        component.blockNonNumeric(event);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
      teclasPermitidas.forEach(key => {
        const event = new KeyboardEvent('keydown', { key });
        jest.spyOn(event, 'preventDefault');
        component.blockNonNumeric(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
      });

      // Prevenir si la longitud es mayor o igual a 10
      component.userForm.controls['document'].setValue('1234567890');
      const evento = new KeyboardEvent('keydown', { key: '1' });
      jest.spyOn(evento, 'preventDefault');
      component.blockNonNumeric(evento);
      expect(evento.preventDefault).toHaveBeenCalled();
    });

    it('debería prevenir la entrada si la longitud es mayor o igual a 10', () => {
      component.userForm.controls['document'].setValue('1234567890');

      const evento = new KeyboardEvent('keydown', { key: '1' });
      jest.spyOn(evento, 'preventDefault');

      component.blockNonNumeric(evento);

      expect(evento.preventDefault).toHaveBeenCalled();
    });
  });

  describe('blockPhoneInput', () => {
    it('debería permitir solo dígitos y el signo + solo al inicio', () => {
      const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
      teclasPermitidas.forEach(key => {
        const event = new KeyboardEvent('keydown', { key });
        jest.spyOn(event, 'preventDefault');
        component.blockPhoneInput(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
      });

      component.phone.setValue('');
      let event = new KeyboardEvent('keydown', { key: '+' });
      jest.spyOn(event, 'preventDefault');
      component.blockPhoneInput(event);
      expect(event.preventDefault).not.toHaveBeenCalled();

      component.phone.setValue('123');
      event = new KeyboardEvent('keydown', { key: '+' });
      jest.spyOn(event, 'preventDefault');
      component.blockPhoneInput(event);
      expect(event.preventDefault).toHaveBeenCalled();

      event = new KeyboardEvent('keydown', { key: 'a' });
      jest.spyOn(event, 'preventDefault');
      component.blockPhoneInput(event);
      expect(event.preventDefault).toHaveBeenCalled();

      component.phone.setValue('1234567890123');
      event = new KeyboardEvent('keydown', { key: '1' });
      jest.spyOn(event, 'preventDefault');
      component.blockPhoneInput(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('blockSpaces', () => {
    it('debería prevenir la tecla espacio', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      jest.spyOn(event, 'preventDefault');
      component.blockSpaces(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('debería permitir otras teclas', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      jest.spyOn(event, 'preventDefault');
      component.blockSpaces(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  it('debería llamar a createUser y mostrar toastr de éxito cuando el formulario es válido', fakeAsync(() => {
    component.userForm.setValue({
      name: 'John',
      lastname: 'Doe',
      document: '1234567890',
      phone: '1234567890',
      birthdate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'Password123!'
    });

    mockUserService.createUser.mockReturnValue(of({}));

    component.createUser();
    tick();

    expect(mockUserService.createUser).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John',
      lastname: 'Doe'
    }));
    expect(mockToastr.success).toHaveBeenCalledWith('Usuario creado con éxito');
    expect(component.userForm.pristine).toBeTruthy();
  }));

  it('no debería llamar a createUser si el formulario es inválido', () => {
    component.userForm.setValue({
      name: '',
      lastname: '',
      document: '',
      phone: '',
      birthdate: '',
      email: '',
      password: ''
    });

    component.createUser();

    expect(mockUserService.createUser).not.toHaveBeenCalled();
  });

  it('debería mostrar toastr de error cuando createUser falla', fakeAsync(() => {
    component.userForm.setValue({
      name: 'John',
      lastname: 'Doe',
      document: '1234567890',
      phone: '1234567890',
      birthdate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'Password123!'
    });

    const error = { message: 'Error al crear el usuario' };
    mockUserService.createUser.mockReturnValue(throwError(() => error));

    component.createUser();
    tick();

    expect(mockToastr.error).toHaveBeenCalledWith(error.message);
  }));
  describe('CreateUserComponent - casos específicos no cubiertos', () => {

  it('debería usar valor vacío cuando document es null o indefinido en blockNonNumeric', () => {
    // Forzar que el control document sea null
    component.userForm.controls['document'].setValue(null);

    const event = new KeyboardEvent('keydown', { key: '1' });
    jest.spyOn(event, 'preventDefault');

    component.blockNonNumeric(event);

    // No debería fallar ni lanzar error, y no se previene si no es invalido
    // Para este test solo importa que no lance excepción y se use '' como valor actual
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('debería mostrar mensaje de error por defecto cuando error.message es indefinido en createUser', fakeAsync(() => {
    component.userForm.setValue({
      name: 'John',
      lastname: 'Doe',
      document: '1234567890',
      phone: '1234567890',
      birthdate: '2000-01-01',
      email: 'john.doe@example.com',
      password: 'Password123!'
    });

    // Error sin propiedad message
    const error = {};
    mockUserService.createUser.mockReturnValue(throwError(() => error));

    component.createUser();
    tick();

    expect(mockToastr.error).toHaveBeenCalledWith('Error al crear usuario');
  }));

});
});