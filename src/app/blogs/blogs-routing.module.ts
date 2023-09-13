import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';

const routes: Route[] = [
  {
    path: '',
    component: BlogsPageComponent,
  },
  {
    path: ':slug',
    component: BlogDetailsComponent,
    // resolve: { preFetchData: BlogDetailsMetadataResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
