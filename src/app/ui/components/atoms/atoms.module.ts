import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LabelComponent,
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent
  ]
})
export class AtomsModule { }