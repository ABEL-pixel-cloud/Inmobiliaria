import { Component,Input, OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit  {
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() variant: 'primary' = 'primary'; 

  count = 0;

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.count = value?.length || 0;
    });
  }

}
