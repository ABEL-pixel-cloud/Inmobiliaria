import { Component,Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
@Input() options: any[] = [];
@Input() displayProperty!: string;
@Input() valueProperty!: string;
@Input() placeholder: string = '';
@Input() id!: string;
@Input() control!: FormControl;
compareBooleans = (a: any, b: any): boolean => a === b;


}
