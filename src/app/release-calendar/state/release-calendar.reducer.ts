import { createReducer, on } from '@ngrx/store';
import { Upcoming } from '../models/release-calendar.models';
import {
  getHottestReleases,
  getOffersPinned,
  getReleases,
  getReleasesInline,
  getReleasesNextPage,
  getUpcomingReleases,
  setCurrentMonth,
  setLoading,
  setSection,
} from './release-calendar.action';

export const initialState = {
  releases: [],
  inlineRelease: [],
  loading: false,
  hottestReleases: [],
  upcomingReleases: [],
  selectedMonth: null,
  previousMonth: null,
  nextMonth: null,
  section: Upcoming,
};

export const releaseCalendarReducer = createReducer(
  initialState,
  on(getOffersPinned, (state, { offersPinned }) => {
    return {
      ...state,
      offersPinned: [...offersPinned],
    };
  }),
  on(getReleases, (state, { releases }) => ({
    ...state,
    releases: [...releases],
  })),
  on(getReleasesNextPage, (state, { releases }) => ({
    ...state,
    releases: [...state.releases, ...releases],
  })),
  on(getReleasesInline, (state, { releases }) => ({
    ...state,
    inlineRelease: [...releases],
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(getHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: [...releases],
  })),
  on(getUpcomingReleases, (state, { releases }) => ({
    ...state,
    upcomingReleases: [...releases],
  })),
  on(setSection, (state, { section }) => ({
    ...state,
    section,
  })),
  on(setCurrentMonth, (state, { month, year }) => ({
    ...state,
    selectedMonth: { month, year },
    previousMonth: {
      month: month !== 1 ? month - 1 : 12,
      year: month !== 1 ? year : year - 1,
    },
    nextMonth: {
      month: month !== 12 ? month + 1 : 1,
      year: month !== 12 ? year : year + 1,
    },
  }))
);
