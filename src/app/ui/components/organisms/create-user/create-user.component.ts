import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { ToastrService } from 'ngx-toastr';
import { FORM_VALIDATORS } from 'src/app/shared/constants/form-validator.constants';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
     this.userForm = this.buildForm();
  }
 private buildForm(): FormGroup {
  return this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(FORM_VALIDATORS.PATTERNS.MAX_NAME_LENGTH),Validators.pattern(FORM_VALIDATORS.PATTERNS.NAME)]],
      lastname: ['', [Validators.required,Validators.maxLength(FORM_VALIDATORS.PATTERNS.MAX_LASTNAME_LENGTH),Validators.pattern(FORM_VALIDATORS.PATTERNS.LASTNAME) ]],
      document: ['', [ Validators.required, Validators.pattern(FORM_VALIDATORS.PATTERNS.DOCUMENT)]],
      phone: ['', [Validators.required,Validators.pattern(FORM_VALIDATORS.PATTERNS.PHONE) ]],
      birthdate: ['', [ Validators.required, minimumAgeValidator(FORM_VALIDATORS.PATTERNS.BIRTHDATE)]],
      email: ['', [ Validators.required,Validators.email,Validators.pattern(FORM_VALIDATORS.PATTERNS.EMAIL)]],
      password: ['', [Validators.required,Validators.pattern(FORM_VALIDATORS.PATTERNS.PASSWORD)]]
  });
}

  get name() { return this.userForm.get('name') as FormControl; }
  get lastname() { return this.userForm.get('lastname') as FormControl; }
  get document() { return this.userForm.get('document') as FormControl; }
  get phone() { return this.userForm.get('phone') as FormControl; }
  get birthdate() { return this.userForm.get('birthdate') as FormControl; }
  get email() { return this.userForm.get('email') as FormControl; }
  get password() { return this.userForm.get('password') as FormControl; }

  blockNonNumeric(event: KeyboardEvent) {
    const invalidKeys = ['e', 'E', '+', '-', '.'];
    const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }

    if (allowedControlKeys.includes(event.key)) {
      return;
    }

    const currentValue: string = this.document.value || '';

    if (currentValue.length >= 10) {
      event.preventDefault();
    }
  }

  blockPhoneInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const currentValue: string = this.phone.value || '';

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (event.key === '+') {
      if (currentValue.length === 0) {
        return;
      } 
    
      event.preventDefault();
      return;
      
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }

    if (currentValue.length >= 13) {
      event.preventDefault();
    }
  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  private normalizeName(value: string): string {
    return value
      .trim()
      .replace(/\s+/g, ' ');
  }

  createUser() {
    if (this.userForm.invalid) return;

    const formValue = { ...this.userForm.value };
    formValue.name = this.normalizeName(formValue.name);
    formValue.lastname = this.normalizeName(formValue.lastname);

    this.userService.createUser(formValue).subscribe({
      next: () => {
        this.toastr.success('Usuario creado con éxito');
        this.userForm.reset();
      },
      error: (error) => {
        this.toastr.error(error.message || 'Error al crear usuario');
      }
    });
  }
}

function minimumAgeValidator(minAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthdate = new Date(control.value);
    const today = new Date();

    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    const isUnderage =
      age < minAge ||
      (age === minAge && monthDiff < 0) ||
      (age === minAge && monthDiff === 0 && dayDiff < 0);

    return isUnderage ? { underage: true } : null;
  };
}