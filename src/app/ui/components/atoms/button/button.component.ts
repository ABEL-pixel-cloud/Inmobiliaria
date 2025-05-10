import { Component,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  
  @Input() customClass = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() text!: string;
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<void>();


  onClick() {
    this.buttonClick.emit();
  }

}
