import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './model.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ModelComponent,
    data: { title: 'Model' },
  },
];
@NgModule({
  declarations: [ModelComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ModelModule {}
