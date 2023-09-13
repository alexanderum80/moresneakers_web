import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleasesPagePaginationComponent } from '../releases/pages/releases-page-pagination/releases-page-pagination.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { releasesSlugUrlMatcher } from '../releases/utils';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
  },
  {
    path: ':slug',
    component: ReleasesPagePaginationComponent,
  },
  {
    path: ':slug/in-stock',
    component: ReleasesPagePaginationComponent,
    matcher: releasesSlugUrlMatcher,
  },
  {
    path: ':slug/coming-soon',
    component: ReleasesPagePaginationComponent,
    matcher: releasesSlugUrlMatcher,
  },
  {
    path: ':slug/resell-only',
    component: ReleasesPagePaginationComponent,
    matcher: releasesSlugUrlMatcher,
  },
  {
    path: 'gender/:gender',
    component: ReleasesPagePaginationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
