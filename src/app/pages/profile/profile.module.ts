import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: { title: 'profile' },
  },
];
@NgModule({
  declarations: [ProfileComponent],

  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgbCollapseModule,
    CKEditorModule,
  ],
})
export class ProfileModule {}
