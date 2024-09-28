import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: { title: 'Categories' },
  },
];
@NgModule({
  declarations: [CategoriesComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class CategoriesModule {}
