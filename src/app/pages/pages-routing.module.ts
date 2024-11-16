import { ProfileModule } from './profile/profile.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'make',
    loadChildren: () => import('./make/make.module').then((m) => m.MakeModule),
  },
  {
    path: 'model',
    loadChildren: () =>
      import('./model/model.module').then((m) => m.ModelModule),
  },
  {
    path: 'model',
    loadChildren: () =>
      import('./model/model.module').then((m) => m.ModelModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./offers/offers.module').then((m) => m.OffersModule),
  },
  {
    path: 'tags',
    loadChildren: () => import('./tags/tags.module').then((m) => m.TagsModule),
  },
  {
    path: 'attributes',
    loadChildren: () =>
      import('./attributes/attributes.module').then((m) => m.AttributesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'add-car',
    loadChildren: () =>
      import('./car-form/car-form.module').then((m) => m.CarFormModule),
  },
  {
    path: 'edit-car/:id/:editable',
    loadChildren: () =>
      import('./car-form/car-form.module').then((m) => m.CarFormModule),
  },
  {
    path: 'duplicate-car/:id/:editable',
    loadChildren: () =>
      import('./car-form/car-form.module').then((m) => m.CarFormModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
