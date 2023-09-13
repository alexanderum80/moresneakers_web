import { createAction, props } from '@ngrx/store';
import { Deal } from '../models/deal';
import { Release } from '../../home/models/release.model';

export const setLoading = createAction(
  '[Deals] Set Loading ',
  props<{ loading: boolean }>()
);

export const setCurrentPage = createAction(
  '[Deals] Set Current Page',
  props<{ current?: number }>()
);

export const setTotalPages = createAction(
  '[Deals] Set Total Deals',
  props<{ pageSize?: number }>()
);

export const concatDeals = createAction(
  '[Deals] Concat Deals',
  props<{ deals: Deal[] }>()
);

export const setTotalDeals = createAction(
  '[Deals] Set Totals Deals',
  props<{ count: number }>()
);

export const setHottestReleases = createAction(
  '[Deals] SetHottest Releases',
  props<{ releases: Release[] }>()
);
