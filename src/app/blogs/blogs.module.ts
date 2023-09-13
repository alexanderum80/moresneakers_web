import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';
import { BlogRoutingModule } from './blogs-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { StoreModule } from '@ngrx/store';
import { blogReducer } from './state/blog.reducer';
import { BlogsListItemComponent } from './components/blogs-list-item/blogs-list-item.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';

@NgModule({
  declarations: [
    BlogsPageComponent,
    BlogsListComponent,
    BlogsListItemComponent,
    BlogDetailsComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    StoreModule.forFeature('blogsModule', blogReducer),
  ],
})
export class BlogsModule {}
