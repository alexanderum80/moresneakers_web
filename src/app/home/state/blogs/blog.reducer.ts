import { createReducer, on } from '@ngrx/store';
import { Blog } from 'src/app/home/models/blog.model';

import { getBlogs } from './blog.actions';

export const initialState: Blog[] = [];

export const blogReducer = createReducer(
  initialState,
  on(getBlogs, (state, response) => [...response.blogs])
);
