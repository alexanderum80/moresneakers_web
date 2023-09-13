import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { AboutUsPageComponent } from './shared/components/about-us-page/about-us-page.component';
import { ContactComponent } from './shared/components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'privacy-policy',
    component: AboutUsPageComponent,
    data: { pageName: 'privacy-policy', breadcrumbName: 'Privacy Policy' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { pageName: 'contact', breadcrumbName: 'Contact' },
  },
  {
    path: 'who-are-we',
    component: AboutUsPageComponent,
    data: { pageName: 'who-are-we', breadcrumbName: 'Who are we?' },
  },
  {
    path: 'become-a-partner',
    component: AboutUsPageComponent,
    data: { pageName: 'become-partner', breadcrumbName: 'Become a partner' },
  },
  {
    path: 'releases',
    loadChildren: () =>
      import('./releases/releases.module').then(m => m.ReleasesModule),
  },
  {
    path: 'collections',
    loadChildren: () =>
      import('./collections/collections.module').then(m => m.CollectionsModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule),
  },
  {
    path: 'styles',
    loadChildren: () => import('./style/style.module').then(m => m.StyleModule),
  },
  {
    path: 'brands',
    loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule),
  },
  // TODO: Add this part to integrate shop routing
  // {
  //   path: 'shops',
  //   loadChildren: () =>
  //     import('./shops/shops.module').then((m) => m.ShopsModule),
  // },
  {
    path: 'whats-new',
    loadChildren: () =>
      import('./offers/offers.module').then(m => m.OffersModule),
  },
  {
    path: 'about-to-drop',
    loadChildren: () =>
      import('./offers/offers.drop.module').then(m => m.OffersDropModule),
  },
  {
    path: 'release-calendar',
    loadChildren: () =>
      import('./release-calendar/release-calendar.module').then(
        m => m.ReleaseCalendarModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./category/category.module').then(m => m.CategoryModule),
  },
  {
    path: 'deals',
    loadChildren: () => import('./deal/deals.module').then(m => m.DealsModule),
  },
  {
    path: '**', // Navigate to Home Page if not found any page
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      useHash: false,
      anchorScrolling: 'enabled',
      // scrollPositionRestoration: 'top',
      relativeLinkResolution: 'legacy',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
