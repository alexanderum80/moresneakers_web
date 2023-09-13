import { createAction, props } from '@ngrx/store';
import { Offer } from 'src/app/home/models/offer.model';
import { Release } from 'src/app/home/models/release.model';

export const getOffersPinned = createAction(
  '[Releases Calendar] Get Offers Pinned',
  props<{ offersPinned: Offer[] }>()
);

export const getReleases = createAction(
  '[Releases Calendar] Get Releases',
  props<{ releases: Release[] }>()
);

export const getReleasesNextPage = createAction(
  '[Releases Calendar] Get Releases Next Page',
  props<{ releases: Release[] }>()
);

export const getReleasesInline = createAction(
  '[Releases Calendar] Get Releases Inline',
  props<{ releases: Release[] }>()
);

export const setLoading = createAction(
  '[Releases Calendar] Set Loading Status',
  props<{ loading: boolean }>()
);

export const getHottestReleases = createAction(
  '[Releases Calendar] Get Hottest Releases',
  props<{ releases: Release[] }>()
);

export const getUpcomingReleases = createAction(
  '[Releases Calendar] Get Upcoming Releases',
  props<{ releases: Release[] }>()
);

export const setCurrentMonth = createAction(
  '[Releases Calendar] Set Current Month',
  props<{ month: number; year: number }>()
);

export const setSection = createAction(
  '[Releases Calendar] Set Section',
  props<{ section: string }>()
);
