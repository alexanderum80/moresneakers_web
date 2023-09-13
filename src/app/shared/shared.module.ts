import { ReleasesSearchPaginationComponent } from './components/releases/releases-search-pagination/releases-search-pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BarRatingModule } from 'ngx-bar-rating';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';

// Header and Footer Components
import { HeaderOneComponent } from './header/header-one/header-one.component';
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import { HeaderTwoComponent } from './header/header-two/header-two.component';
import { FooterTwoComponent } from './footer/footer-two/footer-two.component';
import { HeaderThreeComponent } from './header/header-three/header-three.component';
import { FooterThreeComponent } from './footer/footer-three/footer-three.component';
import { HeaderFourComponent } from './header/header-four/header-four.component';
import { FooterFourComponent } from './footer/footer-four/footer-four.component';

// Components
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProductBoxOneComponent } from './components/product/product-box-one/product-box-one.component';
import { ProductBoxTwoComponent } from './components/product/product-box-two/product-box-two.component';
import { ProductBoxThreeComponent } from './components/product/product-box-three/product-box-three.component';
import { ProductBoxFourComponent } from './components/product/product-box-four/product-box-four.component';
import { ProductBoxFiveComponent } from './components/product/product-box-five/product-box-five.component';
import { ProductBoxVerticalComponent } from './components/product/product-box-vertical/product-box-vertical.component';
import { ProductBoxVerticalSliderComponent } from './components/product/product-box-vertical-slider/product-box-vertical-slider.component';

// NG Select
import { NgSelectModule } from '@ng-select/ng-select';

// Modals Components
import { NewsletterComponent } from './components/modal/newsletter/newsletter.component';
import { QuickViewComponent } from './components/modal/quick-view/quick-view.component';
import { CartModalComponent } from './components/modal/cart-modal/cart-modal.component';
import { CartVariationComponent } from './components/modal/cart-variation/cart-variation.component';
import { VideoModalComponent } from './components/modal/video-modal/video-modal.component';
import { SizeModalComponent } from './components/modal/size-modal/size-modal.component';
import { AgeVerificationComponent } from './components/modal/age-verification/age-verification.component';

// scroll infinite module
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxImageGalleryModule } from 'ngx-image-gallery';

// Skeleton Loader Components
import { SkeletonProductBoxComponent } from './components/skeleton/skeleton-product-box/skeleton-product-box.component';
import { SkeletonCardComponent } from './components/skeleton/skeleton-card/skeleton-card.component';

// Layout Box
import { LayoutBoxComponent } from './components/layout-box/layout-box.component';

// Tap To Top./components/Navbar/navbar.component
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';

// Pipes
import { DiscountPipe } from './pipes/discount.pipe';

// Our Components
import { NavBarComponent } from './components/navbar/navbar.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { FooterComponent } from './footer/footer/footer.component';
import { MsBreadcrumbComponent } from './components/ms-breadcrumb/ms-breadcrumb.component';
import { HeaderComponent } from './header/header/header.component';
import { OfferItemComponent } from './components/offers/offer-item/offer-item.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { ProductsListVerticalSliderComponent } from './components/releases/products-list-vertical-slider/products-list-vertical-slider.component';
import { MsShopCardComponent } from './components/ms-shop-card/ms-shop-card.component';
import { MsLettersFilterBarComponent } from './components/ms-letters-filter-bar/ms-letters-filter-bar.component';
import { MsFilterSidebarComponent } from './components/filters/ms-filter-sidebar/ms-filter-sidebar.component';
import { MsFilterTagsComponent } from './components/filters/ms-filter-tags/ms-filter-tags.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HeadGroupComponent } from './components/group/head-group/head-group.component';
import { HottestReleasesComponent } from './components/hottest-releases/hottest-releases.component';
import { LoadingComponent } from './components/loading/loading.component';
import {
  LineTruncationDirective,
  LineTruncationLibModule,
} from 'ngx-line-truncation';
import { BlogSkeletonItemComponent } from './components/skeleton/blog-skeleton-item/blog-skeleton-item.component';
import { SkeletonOfferItemComponent } from './components/skeleton/skeleton-offer-item/skeleton-offer-item.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { CarouselComponent } from './components/carousel/carousel-home/carousel.component';
import { StylePageHeaderComponent } from './components/style-page-header/style-page-header.component';
import { StyleGroupComponent } from './components/style-group/style-group.component';
import { StyleFiltersHeaderComponent } from './components/style-filters-header/style-filters-header.component';
import { ResponsiveProductCardComponent } from './components/responsive-product-card/responsive-product-card.component';
import { HAMMER_LOADER, HammerModule } from '@angular/platform-browser';
import { ReleasesGroupComponent } from './components/releases/releases-group/releases-group.component';
import { MsSafeHtmlPipe } from './pipes/safe-html.pipe';
import { ReleasesCarouselComponent } from './components/carousel/releases-carousel/releases-carousel.component';
import { HeadingComponent } from './components/heading/heading.component';
import { DiscountOfferItemComponent } from './components/discount-offer-item/discount-offer-item.component';
import { ContactComponent } from './components/contact/contact.component';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

import { ReleasesGroupPaginationComponent } from './components/releases/releases-group-pagination/releases-group-pagination.component';
import { PartnershipComponent } from './components/partnership/partnership.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OnlyMarketplaceComponent } from './components/only-marketplace/only-marketplace.component';
import { HeadGroupAboutToDropComponent } from './components/group/head-group-about-to-drop/head-group-about-to-drop.component';
import { StyleMainGroupComponent } from './components/style-main-group/style-main-group.component';
import { CountDownComponent } from './components/count-down/count-down.component';

const components = [
  // Theme components
  HeaderOneComponent,
  FooterOneComponent,
  HeaderTwoComponent,
  FooterTwoComponent,
  HeaderThreeComponent,
  FooterThreeComponent,
  HeaderFourComponent,
  FooterFourComponent,
  LeftMenuComponent,
  MenuComponent,
  SettingsComponent,
  BreadcrumbComponent,
  CategoriesComponent,
  ProductBoxOneComponent,
  ProductBoxTwoComponent,
  ProductBoxThreeComponent,
  ProductBoxFourComponent,
  ProductBoxFiveComponent,
  ProductBoxVerticalComponent,
  ProductBoxVerticalSliderComponent,
  NewsletterComponent,
  QuickViewComponent,
  CartModalComponent,
  CartVariationComponent,
  VideoModalComponent,
  SizeModalComponent,
  AgeVerificationComponent,
  SkeletonProductBoxComponent,
  LayoutBoxComponent,
  TapToTopComponent,
  DiscountPipe,
  MsSafeHtmlPipe,
  // Our Components
  NavBarComponent,
  HeaderSearchComponent,
  FooterComponent,
  MsBreadcrumbComponent,
  ProductCardComponent,
  HeaderComponent,
  OfferItemComponent,
  CarouselComponent,
  ProductsListVerticalSliderComponent,
  MsShopCardComponent,
  MsLettersFilterBarComponent,
  MsFilterSidebarComponent,
  MsFilterTagsComponent,
  HeadGroupComponent,
  HeadGroupAboutToDropComponent,
  HottestReleasesComponent,
  SkeletonCardComponent,
  BlogSkeletonItemComponent,
  SkeletonOfferItemComponent,
  LoadingComponent,
  AboutUsPageComponent,
  StylePageHeaderComponent,
  StyleGroupComponent,
  StyleMainGroupComponent,
  StyleFiltersHeaderComponent,
  ResponsiveProductCardComponent,
  ReleasesGroupComponent,
  ReleasesGroupPaginationComponent,
  ReleasesSearchPaginationComponent,
  ImpressumPageComponent,
  ReleasesCarouselComponent,
  HeadingComponent,
  DiscountOfferItemComponent,
  ContactComponent,
  PartnershipComponent,
  PaginationComponent,
  OnlyMarketplaceComponent,
  CountDownComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    NgxSliderModule,
    InfiniteScrollModule,
    NgxImageGalleryModule,
    LineTruncationLibModule,
    HammerModule,
    LazyLoadImageModule.forRoot({
      // preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    }),
    NgxSkeletonLoaderModule,
    TranslateModule,
    NgSelectModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    NgSelectModule,
    BarRatingModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    TranslateModule,
    HammerModule,
    LineTruncationDirective,
    ...components,
  ],
  providers: [
    {
      provide: HAMMER_LOADER,
      useValue: async () => {
        return import('hammerjs/hammer');
      },
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Lf6PTYaAAAAALcaUMzAj6Q5cGMzD9l79q7ZY82g',
      } as RecaptchaSettings,
    },
  ],
})
export class SharedModule {}
