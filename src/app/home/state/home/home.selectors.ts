import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { HomeLayout } from '../../models/homeLayout.model';

export const selectLayout = (state: AppState) => state.homeModule.homeLayout;

export const selectLayoutHeader = createSelector(
  selectLayout,
  (state: HomeLayout) => {
    return state.header;
  }
);

export const selectLayoutSlider = createSelector(
  selectLayout,
  (state: HomeLayout) => {
    return state.slider;
  }
);

export const selectLayoutHottestReleases = createSelector(
  selectLayout,
  (state: HomeLayout) => {
    return state.hottest;
  }
);

export const selectLayoutHeading = createSelector(
  selectLayout,
  (state: HomeLayout) => {
    return state.heading;
  }
);

export const selectLayoutDeals = createSelector(
  selectLayout,
  (state: HomeLayout) => {
    return state.deals;
  }
);
