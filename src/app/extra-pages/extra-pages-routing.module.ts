import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { Error401Component } from './error401/error401.component';

const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'access-denied',
    component: Error401Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {}
