import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsPageComponent } from './pages/shops-page/shops-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsRoutingModule {}
