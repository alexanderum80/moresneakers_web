import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsPageComponent } from './pages/collections-page/collections-page.component';
import { stylesUrlMatcher } from '../releases/utils';

const routes: Routes = [
  {
    path: ':slug',
    component: CollectionsPageComponent,
    matcher: stylesUrlMatcher,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
