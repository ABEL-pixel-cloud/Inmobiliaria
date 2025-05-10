import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() id!: string;
  @Input() type: string = "text";
  @Input() placeholder!: string;
  @Input() value!: string;
  @Input() control!: FormControl;
  @Input() customClass = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
}
