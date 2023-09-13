import { createAction, props } from '@ngrx/store';
import { Style } from '../../home/models/style.model';
import { Release } from '../../home/models/release.model';
import { OptionSort } from 'src/app/home/models/sortOptions';

export const getReleasesByStyle = createAction(
  '[Style] Get Releases by Style',
  props<{ releasesByStyle: Release[] }>()
);
export const concatReleasesByStyle = createAction(
  '[Style] Concat Releases by Style',
  props<{ releasesByStyle: Release[] }>()
);
export const setReleasesByStyleCount = createAction(
  '[Style] Set Releases by Style count',
  props<{ count: number }>()
);

export const setStyle = createAction(
  '[Style] Set Style ',
  props<{ style: Style }>()
);

export const setLoading = createAction(
  '[Style] Set Loading ',
  props<{ loading: boolean }>()
);

export const setSortOptions = createAction(
  '[Style] Set Sort Options',
  props<{ sortOption: OptionSort }>()
);

export const setCurrentPage = createAction(
  '[Style] Set Current Page',
  props<{ current?: number }>()
);

export const setTotalPages = createAction(
  '[Style] Set Total Pages',
  props<{ pageSize?: number }>()
);

export const setCategory = createAction(
  '[Style] Set Category',
  props<{ category: string }>()
);

export const setFiltersCategory = createAction(
  '[Style] Set Filters Category',
  props<{ category: string[] }>()
);

export const setFiltersBrands = createAction(
  '[Style] Set Filters Brands',
  props<{ brands: string[] }>()
);

export const setFiltersGender = createAction(
  '[Style] Set Filters Gender',
  props<{ gender: string[] }>()
);

export const setFilterOnlyOnSale = createAction(
  '[Style] Set Filters Only On Sale',
  props<{ onlyOnSale: boolean }>()
);

export const setFiltersName = createAction(
  '[Style] Set Filters Name',
  props<{ name: string }>()
);

export const setFiltersColor = createAction(
  '[Style] Set Filters Color',
  props<{ colors: string[] }>()
);

export const setFiltersSize = createAction(
  '[Style] Set Filters Size',
  props<{ sizes: string[] }>()
);

export const setFiltersNames = createAction(
  '[Style] Set Filters Names',
  props<{ filtersNames: any }>()
);

export const clearFilters = createAction('[Style] Clear Filters');

export const clearState = createAction('[Style] Clear State');

export const setFiltersPrice = createAction(
  '[Style] Set Filters Price',
  props<{ prices: string[] }>()
);

export const setFilters = createAction(
  '[Style] Set Filters',
  props<{ filters: any }>()
);
