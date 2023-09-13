import { createAction, props } from '@ngrx/store';
import { Offer } from 'src/app/home/models/offer.model';
import { Release } from 'src/app/home/models/release.model';
import { OptionSort } from 'src/app/home/models/sortOptions';
import { FilterPrice } from 'src/app/shared/classes/filter';

export const getOffers = createAction(
  '[Offers] Get Offers',
  props<{ offers: Offer[] }>()
);

export const getAllRafflesOffer = createAction(
  '[Offers] Get Coming Soon Offers',
  props<{ offersRaffles: Offer[] }>()
);

export const getAllJustDroppedOffer = createAction(
  '[Offers] Get Just Dropped Offers',
  props<{ offersJustDropped: Offer[] }>()
);

export const getOffersNextPage = createAction(
  '[Offers] Get Offers Next Page',
  props<{ offers: Offer[] }>()
);
export const getOffersRafflesNextPage = createAction(
  '[Offers] Get Offers Raffes Next Page',
  props<{ offersRaffles: Offer[] }>()
);

export const getOffersJustDropNextPage = createAction(
  '[Offers] Get Offers JustDropped Next Page',
  props<{ offersJustDropped: Offer[] }>()
);
export const getOffersComingSoonNextPage = createAction(
  '[Offers] Get Offers Coming Soon Next Page',
  props<{ offers: Offer[] }>()
);
export const getOffersJustDroppedNextPage = createAction(
  '[Offers] Get Offers Just Dropped Next Page',
  props<{ offers: Offer[] }>()
);

export const setFiltersCategory = createAction(
  '[Offers] Set Filters Category',
  props<{ category: string[] }>()
);

export const setFiltersShops = createAction(
  '[Offers] Set Filters shops',
  props<{ shops: string[] }>()
);

export const setFiltersBrands = createAction(
  '[Offers] Set Filters Brands',
  props<{ brands: string[] }>()
);

export const setFiltersShipping = createAction(
  '[Offers] Set Filters Shipping',
  props<{ shipping: string[] }>()
);

export const setFiltersColor = createAction(
  '[Offers] Set Filters Color',
  props<{ colors: string[] }>()
);

export const setFiltersSize = createAction(
  '[Offers] Set Filters Size',
  props<{ sizes: string[] }>()
);

export const setFiltersPrice = createAction(
  '[Offers] Set Filters Price',
  props<{ prices: FilterPrice }>()
);

export const setFiltersStatus = createAction(
  '[Offers] Set Filter Status',
  props<{ status: string[] }>()
);

export const setStatusGroup = createAction(
  '[Offers] Set Status Group',
  props<{ statusGroup: string }>()
);

export const setSortOptions = createAction(
  '[Offers] Set Sort Options',
  props<{ sortOption: OptionSort }>()
);

export const setLoading = createAction(
  '[Offers] Set Loading ',
  props<{ loading: boolean }>()
);

export const setIsJustDropped = createAction(
  '[Offers] Set Is Just Dropped ',
  props<{ isJustDropped: boolean }>()
);

export const setIsRaffle = createAction(
  '[Offers] Set Is Raffle ',
  props<{ isRaffle: boolean }>()
);

// Offer Details
export const setSelectedOffer = createAction(
  '[Offers Details] Set Selected offer',
  props<{ offer: Offer }>()
);

// Pagination
export const setTotalOffers = createAction(
  '[Offers] Set Total Offers',
  props<{ total: number }>()
);

export const setHottestReleases = createAction(
  '[Offers] SetHottest Releases',
  props<{ releases: Release[] }>()
);

export const getOffersPinned = createAction(
  '[Offers] Get Offers Pinned',
  props<{ offersPinned: Offer[] }>()
);

export const getOffersCount = createAction('[Offers] Set Total Offers In Api');
