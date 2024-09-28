import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { title: 'users' },
  },
];
@NgModule({
  declarations: [UsersComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class UsersModule {}
