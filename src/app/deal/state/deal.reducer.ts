import { createReducer, on } from '@ngrx/store';
import {
  concatDeals,
  setCurrentPage,
  setHottestReleases,
  setLoading,
  setTotalDeals,
  setTotalPages,
} from './deal.action';

export const initialState = {
  deals: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
  count: 0,
  totalDeals: 0,
};

export const dealReducer = createReducer(
  initialState,
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(setCurrentPage, (state, { current = 1 }) => ({
    ...state,
    currentPage: +current,
  })),
  on(setTotalPages, (state, { pageSize = 28 }) => ({
    ...state,
    totalPages: Math.ceil(state.count / pageSize),
  })),
  on(concatDeals, (state, { deals }) => ({
    ...state,
    deals: [/* ...state.deals, */ ...deals],
  })),
  on(setTotalDeals, (state, { count }) => ({
    ...state,
    totalDeals: count,
  })),
  on(setHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: releases,
  }))
);
