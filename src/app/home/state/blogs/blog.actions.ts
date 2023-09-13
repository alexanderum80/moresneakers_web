import { createAction, props } from '@ngrx/store';
import { Blog } from 'src/app/home/models/blog.model';

export const getBlogs = createAction(
  '[HOME PAGE] Get Blogs',
  props<{ blogs: Blog[] }>()
);
