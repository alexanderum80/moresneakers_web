import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';
import { FashionTwoComponent } from './fashion/fashion-two/fashion-two.component';
import { FashionThreeComponent } from './fashion/fashion-three/fashion-three.component';
import { VegetableComponent } from './vegetable/vegetable.component';
import { WatchComponent } from './watch/watch.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { FlowerComponent } from './flower/flower.component';
import { BeautyComponent } from './beauty/beauty.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { PetsComponent } from './pets/pets.component';
import { GymComponent } from './gym/gym.component';
import { ToolsComponent } from './tools/tools.component';
import { ShoesComponent } from './shoes/shoes.component';
import { BagsComponent } from './bags/bags.component';
import { MarijuanaComponent } from './marijuana/marijuana.component';

// Widgest Components
import { SliderComponent } from './widgets/slider/slider.component';
import { BlogComponent } from './widgets/blog/blog.component';
import { LogoComponent } from './widgets/logo/logo.component';
import { InstagramComponent } from './widgets/instagram/instagram.component';
import { ServicesComponent } from './widgets/services/services.component';
import { CollectionComponent } from './widgets/collection/collection.component';
import { MoresneakersComponent } from './moresneakers/moresneakers.component';
import { BlogSectionComponent } from './widgets/blog-section/blog-section.component';
import { MsBlogComponent } from './widgets/ms-blog/ms-blog.component';
import { WhatWeDoSectionComponent } from './widgets/what-we-do-section/what-we-do-section.component';

import { homeReducer } from './state/home/home.reducer';
import { offerReducer } from './state/offers/offer.reducer';

import { releaseReducer } from './state/release/release.reducer';
import { MsStyleItemComponent } from './widgets/ms-style-item/ms-style-item.component';
import { blogReducer } from './state/blogs/blog.reducer';
import { OffersPinnedModule } from '../offers-pinned/offers-pinned.module';

export const reducers = {
  homeLayout: homeReducer,
  offers: offerReducer,
  releases: releaseReducer,
  blogs: blogReducer,
};

@NgModule({
  declarations: [
    FashionOneComponent,
    FashionTwoComponent,
    FashionThreeComponent,
    VegetableComponent,
    WatchComponent,
    FurnitureComponent,
    FlowerComponent,
    BeautyComponent,
    ElectronicsComponent,
    PetsComponent,
    GymComponent,
    ToolsComponent,
    ShoesComponent,
    BagsComponent,
    MarijuanaComponent,
    // Widgest Components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    InstagramComponent,
    ServicesComponent,
    CollectionComponent,
    MoresneakersComponent,
    BlogSectionComponent,
    MsBlogComponent,
    WhatWeDoSectionComponent,
    MsStyleItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    OffersPinnedModule,
    StoreModule.forFeature('homeModule', reducers),
  ],
})
export class HomeModule {}
