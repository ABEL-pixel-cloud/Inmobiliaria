import { Component,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'third' | 'danger' = 'primary';
  @Input() text!: string;
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<void>();


  onClick() {
    this.buttonClick.emit();
  }

}
