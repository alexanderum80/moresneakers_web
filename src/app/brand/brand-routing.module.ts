import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandPageComponent } from './pages/brand-page/brand-page.component';
import { BrandReleasesComponent } from './pages/brand-releases/brand-releases.component';
import { releasesSlugUrlMatcher } from '../releases/utils';

const routes: Routes = [
  {
    path: '',
    component: BrandPageComponent,
  },
  {
    path: ':slug/in-stock',
    component: BrandReleasesComponent,
    matcher: releasesSlugUrlMatcher,
  },
  {
    path: ':slug/coming-soon',
    component: BrandReleasesComponent,
    matcher: releasesSlugUrlMatcher,
  },
  {
    path: ':slug/resell-only',
    component: BrandReleasesComponent,
    matcher: releasesSlugUrlMatcher,
  },
  {
    path: ':slug',
    redirectTo: ':slug/in-stock',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
