import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatsAboutDropComponent } from './pages/whats-about-drop/whats-about-drop.component';

const routes: Routes = [
  // {
  //     path: '',
  //     component: WhatsAboutDropComponent,
  // },
  { path: '', redirectTo: 'coming-soon', pathMatch: 'full' },
  {
    path: 'coming-soon',
    component: WhatsAboutDropComponent,
  },
  {
    path: 'just-dropped',
    component: WhatsAboutDropComponent,
  },
  {
    path: 'raffles',
    component: WhatsAboutDropComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersDropRoutingModule {}
