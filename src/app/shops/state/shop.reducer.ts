import { createReducer, on } from '@ngrx/store';
import {
  concatShops,
  getHottestReleases,
  setLetterFilter,
  setLoading,
  setShops,
} from './shop.action';

export const initialState = {
  shops: [],
  filterLetter: '',
  loading: false,
  hottestReleases: [],
};

export const shopReducer = createReducer(
  initialState,
  on(setShops, (state, { shops }) => ({
    ...state,
    shops: [...shops],
  })),
  on(setLetterFilter, (state, { letter }) => ({
    ...state,
    filterLetter: letter,
  })),
  on(concatShops, (state, { shops }) => ({
    ...state,
    shops: [...state.shops, ...shops],
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(getHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: releases,
  }))
);
