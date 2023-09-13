import { createReducer, on } from '@ngrx/store';
import { ReleaseState } from '../../models/release.model';
import {
  getHottestReleases,
  getLatestReleases,
  getUpcomingReleases,
} from './release.action';

export const initialState: ReleaseState = {};

export const releaseReducer = createReducer(
  initialState,
  on(getLatestReleases, (state, payload) => ({
    ...state,
    lastestReleases: [...payload.releases],
  })),
  on(getUpcomingReleases, (state, payload) => ({
    ...state,
    upcomingReleases: [...payload.releases],
  })),
  on(getHottestReleases, (state, payload) => ({
    ...state,
    hottestReleases: [...payload.releases],
  }))
);
