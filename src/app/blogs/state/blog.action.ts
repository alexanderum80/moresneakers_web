import { createAction, props } from '@ngrx/store';
import { Release } from 'src/app/home/models/release.model';

export const setBlogs = createAction(
  '[Blogs] Set Blogs',
  props<{ blogs: any[] }>()
);
export const concatBlogs = createAction(
  '[Blogs] Concat Blogs',
  props<{ blogs: any[] }>()
);

export const setLoading = createAction(
  '[Blogs] Set Loading Status',
  props<{ loading: boolean }>()
);

export const getHottestReleases = createAction(
  '[Blogs] Get Hottest Releases',
  props<{ releases: Release[] }>()
);

export const setTotalBlogs = createAction(
  '[Blogs] Set Totals Blogs',
  props<{ count: number }>()
);

export const setTotalPages = createAction(
  '[Blogs] Set Total Pages',
  props<{ pageSize?: number }>()
);

export const setCurrentPage = createAction(
  '[Blogs] Set Current Page',
  props<{ current?: number }>()
);
