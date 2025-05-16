import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './text/text.component';
import { IconComponent } from './icon/icon.component';





@NgModule({
  declarations: [
    LabelComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    TextComponent,
    IconComponent,
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
    ButtonComponent,
    TextComponent,
    IconComponent

  ]
})
export class AtomsModule { }