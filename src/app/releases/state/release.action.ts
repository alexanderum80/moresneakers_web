import { createAction, props } from '@ngrx/store';
import { Offer } from 'src/app/home/models/offer.model';
import {
  Release,
  ReleaseOffersFilters,
  ReleaseShopOfferGroup,
} from 'src/app/home/models/release.model';
import { OptionSort } from 'src/app/home/models/sortOptions';

export const getReleases = createAction(
  '[Releases] Get Releases',
  props<{ releases: Release[] }>()
);

export const getReleasesNextPage = createAction(
  '[Releases] Get Releases Next Page',
  props<{ releases: Release[] }>()
);

export const setLoading = createAction(
  '[Releases] Set Loading Status',
  props<{ loading: boolean }>()
);

export const setCategory = createAction(
  '[Releases] Set Category',
  props<{ category: string }>()
);

export const setFilters = createAction(
  '[Releases] Set Filters',
  props<{ filters: any }>()
);

export const setFiltersCategory = createAction(
  '[Releases] Set Filters Category',
  props<{ category: string[] }>()
);

export const setFiltersBrands = createAction(
  '[Releases] Set Filters Brands',
  props<{ brands: string[] }>()
);

export const setFiltersGender = createAction(
  '[Releases] Set Filters Gender',
  props<{ gender: string[] }>()
);

export const setFilterOnlyOnSale = createAction(
  '[Releases] Set Filters Only On Sale',
  props<{ onlyOnSale: boolean }>()
);

export const setFiltersName = createAction(
  '[Releases] Set Filters Name',
  props<{ name: string }>()
);

export const setFiltersColor = createAction(
  '[Releases] Set Filters Color',
  props<{ colors: string[] }>()
);

export const setFiltersSize = createAction(
  '[Releases] Set Filters Size',
  props<{ sizes: string[] }>()
);

export const setFiltersNames = createAction(
  '[Releases] Set Filters Names',
  props<{ filtersNames: any }>()
);

export const clearFilters = createAction('[Releases] Clear Filters');

export const clearState = createAction('[Releases] Clear State');

export const setFiltersPrice = createAction(
  '[Releases] Set Filters Price',
  props<{ prices: string[] }>()
);

export const setFiltersStatus = createAction(
  '[Releases] Set Filters Status',
  props<{ status: string }>()
);

export const setSortOptions = createAction(
  '[Releases] Set Sort Options',
  props<{ sortOption: OptionSort }>()
);

// Release Details
export const setSelectedRelease = createAction(
  '[Releases Details] Set Selected release',
  props<{ release: Release }>()
);

export const setOffersOfRelease = createAction(
  '[Releases Details] Set offers of the release',
  props<{ offers: ReleaseShopOfferGroup[] }>()
);

export const concatOffersOfRelease = createAction(
  '[Releases Details] concat offers of the release',
  props<{ offers: Offer[] }>()
);

export const setFiltersOffers = createAction(
  '[Releases Details] Set Filters Offers',
  props<{ filters: ReleaseOffersFilters }>()
);

export const setLoadingOffers = createAction(
  '[Releases Details] Set Loading Offers',
  props<{ loading: boolean }>()
);

export const resetOffers = createAction('[Releases Details] Reset Offers');

// Pagination
export const setTotalReleases = createAction(
  '[Releases] Set Total Releases',
  props<{ total: number }>()
);

export const resetReleaseState = createAction(
  '[Releases] Reset Releases State'
);

export const getHottestReleases = createAction(
  '[Releases] Get Hottest Releases',
  props<{ releases: Release[] }>()
);

export const setStatusGroup = createAction(
  '[Releases] Set Status Group',
  props<{ statusGroup: string }>()
);

export const setTotalPages = createAction(
  '[Releases] Set Total Pages',
  props<{ pageSize: number }>()
);

export const clearReleases = createAction('[Releases] Clear Releases[]');

export const setCurrentPage = createAction(
  '[Releases] Set Current Page in Pagination',
  props<{ current: number }>()
);
