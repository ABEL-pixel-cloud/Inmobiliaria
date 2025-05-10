import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let textareaElement: HTMLTextAreaElement;

 beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ TextareaComponent ],
    imports: [ ReactiveFormsModule ],
  }).compileComponents();

  fixture = TestBed.createComponent(TextareaComponent);
  component = fixture.componentInstance;


  component.control = new FormControl('');

  fixture.detectChanges();
  textareaElement = fixture.nativeElement.querySelector('textarea');
});

  it('should create the textarea component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept id input and assign it to textarea', () => {
    component.id = 'test-id';
    fixture.detectChanges();
    expect(textareaElement.id).toBe('test-id');
  });

  it('should accept placeholder input and assign it to textarea', () => {
    component.placeholder = 'Enter text';
    fixture.detectChanges();
    expect(textareaElement.placeholder).toBe('Enter text');
  });

  it('should accept customClass input and apply it to textarea', () => {
    component.customClass = 'custom-class';
    fixture.detectChanges();
    expect(textareaElement.classList).toContain('custom-class');
  });

  it('should accept variant input and apply the correct class to textarea', () => {
  component.variant = 'danger';
  component.control = new FormControl('');
  fixture.detectChanges();

  const textareaElement: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
  expect(textareaElement.classList).toContain('form-textarea__input--danger');
});

  it('should track the character count when control value changes', () => {
    component.control = new FormControl('');
    component.ngOnInit();
    component.control.setValue('Test');
    fixture.detectChanges();
    expect(component.count).toBe(4);
  });

  it('should handle an empty control value and set count to 0', () => {
    component.control = new FormControl('');
    component.ngOnInit();
    component.control.setValue('');
    fixture.detectChanges();
    expect(component.count).toBe(0);
  });

  it('should update the count when control value changes dynamically', () => {
    component.control = new FormControl('');
    component.ngOnInit();
    component.control.setValue('Another test');
    fixture.detectChanges();
    expect(component.count).toBe(12);
  });
});