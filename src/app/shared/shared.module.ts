

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';





import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VazirFontDirective } from './directives/vazir-font.directive';

@NgModule({
  declarations: [

  
    
  ], 
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [

    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    
  ]
})
export class SharedModule { }