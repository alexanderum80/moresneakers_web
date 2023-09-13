import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatsNewPageComponent } from './pages/whats-new-page/whats-new-page.component';

const routes: Routes = [
  {
    path: '',
    component: WhatsNewPageComponent,
  },
  {
    path: 'available',
    component: WhatsNewPageComponent,
  },
  {
    path: 'on-sale',
    component: WhatsNewPageComponent,
  },
  {
    path: 'restock',
    component: WhatsNewPageComponent,
  },
  {
    path: 'sold-out',
    component: WhatsNewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
