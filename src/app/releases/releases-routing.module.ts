import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseDetailsComponent } from './pages/release-details/release-details.component';
import { ReleasesPagePaginationComponent } from './pages/releases-page-pagination/releases-page-pagination.component';
import { ReleasesPageSearchComponent } from './pages/releases-page-search/releases-page-search.component';
import { releasesUrlMatcher } from './utils';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'in-stock',
    pathMatch: 'full',
  },
  {
    path: 'in-stock',
    matcher: releasesUrlMatcher,
    component: ReleasesPagePaginationComponent,
  },
  {
    path: 'coming-soon',
    matcher: releasesUrlMatcher,
    component: ReleasesPagePaginationComponent,
  },
  {
    path: 'resell-only',
    matcher: releasesUrlMatcher,
    component: ReleasesPagePaginationComponent,
  },
  {
    path: 'search',
    component: ReleasesPageSearchComponent,
  },
  {
    path: ':slug',
    component: ReleaseDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleasesRoutingModule {}
