import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create the button component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit buttonClick when the button is clicked', () => {
    const spy = jest.spyOn(component.buttonClick, 'emit');
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should accept customClass input and apply it to the button', () => {
    component.customClass = 'custom-class';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('custom-class');
  });

  it('should accept variant input and set the button class accordingly', () => {
    component.variant = 'danger';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('danger');
  });

  it('should display the text input', () => {
    component.text = 'Click Me';
    fixture.detectChanges();
    expect(buttonElement.textContent).toBe('Click Me');
  });


});