import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttributesComponent } from './attributes.component';

const routes: Routes = [
  {
    path: '',
    component: AttributesComponent,
    data: { title: 'attributes' },
  },
];
@NgModule({
  declarations: [AttributesComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class AttributesModule {}
