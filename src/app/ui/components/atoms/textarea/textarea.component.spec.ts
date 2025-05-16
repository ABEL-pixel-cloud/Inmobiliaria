import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

describe('TextareaComponent', () => {
  let componente: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let elementoTextarea: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    componente = fixture.componentInstance;

    componente.control = new FormControl('');

    fixture.detectChanges();
    elementoTextarea = fixture.nativeElement.querySelector('textarea');
  });

  it('debería crear el componente textarea', () => {
    expect(componente).toBeTruthy();
  });

  it('debería aceptar la entrada id y asignarla al textarea', () => {
    componente.id = 'id-prueba';
    fixture.detectChanges();
    expect(elementoTextarea.id).toBe('id-prueba');
  });

  it('debería aceptar el placeholder y asignarlo al textarea', () => {
    componente.placeholder = 'Ingrese texto';
    fixture.detectChanges();
    expect(elementoTextarea.placeholder).toBe('Ingrese texto');
  });


  it('debería contar caracteres cuando el valor del control cambia', () => {
    componente.control = new FormControl('');
    componente.ngOnInit();
    componente.control.setValue('Prueba');
    fixture.detectChanges();
    expect(componente.count).toBe(6);
  });

  it('debería manejar un valor vacío y establecer el contador en 0', () => {
    componente.control = new FormControl('');
    componente.ngOnInit();
    componente.control.setValue('');
    fixture.detectChanges();
    expect(componente.count).toBe(0);
  });

  it('debería actualizar el contador cuando el valor del control cambia dinámicamente', () => {
    componente.control = new FormControl('');
    componente.ngOnInit();
    componente.control.setValue('Otra prueba');
    fixture.detectChanges();
    expect(componente.count).toBe(11);
  });
});