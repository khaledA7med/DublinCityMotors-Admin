import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { unAuthGuard } from './core/guards/un-auth.guard';
import { NotFoundComponent } from './extra-pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    // component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [unAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    canActivate: [unAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./extra-pages/extra-pages.module').then(
        (m) => m.ExtraPagesModule
      ),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
