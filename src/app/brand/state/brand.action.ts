import { createAction, props } from '@ngrx/store';
import { Release } from 'src/app/home/models/release.model';
import { Brand } from '../models/brand';

export const getBrands = createAction(
  '[Brands] Get Brands',
  props<{ brands: Brand[] }>()
);

export const getBrand = createAction(
  '[Brands] Get Brand',
  props<{ brand: Brand }>()
);

export const concatBrands = createAction(
  '[Brands] Concat Brands',
  props<{ brands: Brand[] }>()
);
export const setLetterFilter = createAction(
  '[Brands] Set Letter Filter',
  props<{ letter: string }>()
);

export const setLoading = createAction(
  '[Brands] Set Loading Status',
  props<{ loading: boolean }>()
);

export const getHottestReleases = createAction(
  '[Brands] Get Hottest Releases',
  props<{ releases: Release[] }>()
);

export const setTotalPages = createAction(
  '[Brands] Set Total Pages',
  props<{ pageSize?: number }>()
);

export const clearBrand = createAction('[Brands] Clear Brands');

export const setCurrentPage = createAction(
  '[Brands] Set Current Page',
  props<{ current?: number }>()
);

export const setTotalBrands = createAction(
  '[Brands] Set Totals Brands',
  props<{ count: number }>()
);

export const resetState = createAction('[Brands] Reset State');
