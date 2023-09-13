import { createAction, props } from '@ngrx/store';
import { Release } from '../../models/release.model';

export const getLatestReleases = createAction(
  '[HOME PAGE] Get Latest Releases',
  props<{ releases: Release[] }>()
);

export const getUpcomingReleases = createAction(
  '[HOME PAGE] Get Upcoming Releases',
  props<{ releases: Release[] }>()
);

export const getHottestReleases = createAction(
  '[HOME PAGE] Get Hottest Releases',
  props<{ releases: Release[] }>()
);
