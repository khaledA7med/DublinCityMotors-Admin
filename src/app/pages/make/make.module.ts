import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeComponent } from './make.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MakeComponent,
    data: { title: 'Make' },
  },
];
@NgModule({
  declarations: [MakeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class MakeModule {}
