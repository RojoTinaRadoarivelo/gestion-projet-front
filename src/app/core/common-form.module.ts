import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule],
  exports: [ReactiveFormsModule, FormsModule, MatFormFieldModule],
})
export class CommonFormModule {}
