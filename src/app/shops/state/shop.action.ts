import { createAction, props } from '@ngrx/store';
import { Release } from 'src/app/home/models/release.model';

export const setShops = createAction(
  '[Shops] Set Shops',
  props<{ shops: any[] }>()
);
export const concatShops = createAction(
  '[Shops] Concat Shops',
  props<{ shops: any[] }>()
);
export const setLetterFilter = createAction(
  '[Shops] Set Letter Filter',
  props<{ letter: string }>()
);

export const setLoading = createAction(
  '[Shops] Set Loading Status',
  props<{ loading: boolean }>()
);

export const getHottestReleases = createAction(
  '[Shops] Get Hottest Releases',
  props<{ releases: Release[] }>()
);
