import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagsComponent } from './tags.component';

const routes: Routes = [
  {
    path: '',
    component: TagsComponent,
    data: { title: 'tags' },
  },
];
@NgModule({
  declarations: [TagsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class TagsModule {}
