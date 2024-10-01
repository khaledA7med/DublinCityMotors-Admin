import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndDirective } from './dnd.directive';
import { DropzoneComponent } from './dropzone/dropzone.component';

@NgModule({
  declarations: [DropzoneComponent, DndDirective],
  imports: [CommonModule],
  exports: [DropzoneComponent, DndDirective],
})
export class DropzoneModule {}
