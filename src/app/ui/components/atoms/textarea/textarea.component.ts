import { Component,Input, OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl<string | null>;
  @Input() customClass = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  count = 0;

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.count = value?.length || 0;
    });
  }

}
