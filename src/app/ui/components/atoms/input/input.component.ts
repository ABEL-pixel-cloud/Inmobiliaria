import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() id!: string;
  @Input() type: string = "text";
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() variant: 'primary' = 'primary'; 
}
