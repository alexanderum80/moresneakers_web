import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ReleaseState } from '../../models/release.model';

export const selectReleases = (state: AppState) => state.homeModule.releases;

export const selectLatestReleases = createSelector(
  selectReleases,
  (state: ReleaseState) => state.lastestReleases
);

export const selectUpcomingReleases = createSelector(
  selectReleases,
  (state: ReleaseState) => state.upcomingReleases
);

export const selectHottestReleases = createSelector(
  selectReleases,
  (state: ReleaseState) => state.hottestReleases
);
