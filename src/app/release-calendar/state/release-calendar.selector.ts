import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

export const selectReleases = (state: AppState) => state.releasesCalendarModule;

export const selectOffersPinnedList = createSelector(
  selectReleases,
  state => state.offersPinned
);

export const selectReleasesList = createSelector(
  selectReleases,
  state => state.releases
);

export const selectInlineReleasesList = createSelector(
  selectReleases,
  state => state.inlineRelease
);

export const selectLoading = createSelector(
  selectReleases,
  state => state.loading
);

export const selectCurrentMonth = createSelector(
  selectReleases,
  state => state.selectedMonth
);

export const selectNextMonth = createSelector(
  selectReleases,
  state => state.nextMonth
);

export const selectPrevMonth = createSelector(
  selectReleases,
  state => state.previousMonth
);

export const selectHottestReleases = createSelector(
  selectReleases,
  state => state.hottestReleases
);

export const selectUpcomingReleases = createSelector(
  selectReleases,
  state => state.upcomingReleases
);

export const selectSection = createSelector(
  selectReleases,
  state => state.section
);
