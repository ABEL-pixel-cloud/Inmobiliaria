import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './text/text.component';
import { IconComponent } from './icon/icon.component';
import { SelectComponent } from './select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalComponent } from './modal/modal.component';




@NgModule({
  declarations: [
    LabelComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    TextComponent,
    IconComponent,
    SelectComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent,
    TextComponent,
    IconComponent,
    SelectComponent,
    NgSelectModule,
    ModalComponent,

  ]
})
export class AtomsModule { }