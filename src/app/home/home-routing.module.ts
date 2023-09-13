import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoresneakersComponent } from './moresneakers/moresneakers.component';

const routes: Routes = [
  {
    path: '',
    component: MoresneakersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
