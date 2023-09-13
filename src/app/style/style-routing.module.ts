import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainStylePageComponent } from './pages/main-style-page/main-style-page.component';
import { StylePageComponent } from './pages/style-page/style-page.component';
import { stylesUrlMatcher } from '../releases/utils';

const routes: Routes = [
  {
    path: '',
    component: MainStylePageComponent,
  },
  {
    path: ':slug',
    component: StylePageComponent,
    matcher: stylesUrlMatcher,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StyleRoutingModule {}
