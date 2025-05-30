import { Component,Input  } from '@angular/core';


@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() id!: string;
  @Input() variant: 'primary' | 'secondary' | 'third' | 'danger' = 'primary';
}
