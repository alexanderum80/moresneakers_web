import { createReducer, on } from '@ngrx/store';
import {
  clearBrand,
  concatBrands,
  getBrand,
  getBrands,
  getHottestReleases,
  resetState,
  setCurrentPage,
  setLetterFilter,
  setLoading,
  setTotalBrands,
  setTotalPages,
} from './brand.action';

export const initialState = {
  brands: [],
  selectedBrand: null,
  filterLetter: '',
  loading: false,
  hottestReleases: [],
  totalPages: 1,
  currentPage: 1,
  totalBrands: 0,
};

export const brandReducer = createReducer(
  initialState,
  on(getBrands, (state, { brands }) => ({
    ...state,
    brands: [...brands],
  })),
  on(concatBrands, (state, { brands }) => ({
    ...state,
    brands: [/* ...state.brands, */ ...brands],
  })),
  on(getBrand, (state, { brand }) => ({
    ...state,
    brand,
  })),
  on(setLetterFilter, (state, { letter }) => ({
    ...state,
    filterLetter: letter,
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(getHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: releases,
  })),
  on(setTotalPages, (state, { pageSize = 28 }) => ({
    ...state,
    totalPages: Math.ceil(state.totalBrands / pageSize),
  })),
  on(clearBrand, state => ({
    ...state,
    brands: [],
  })),
  on(setCurrentPage, (state, { current = 1 }) => ({
    ...state,
    currentPage: +current,
  })),
  on(setTotalBrands, (state, { count }) => ({
    ...state,
    totalBrands: count,
  })),
  on(resetState, state => ({
    ...state,
    ...initialState,
  }))
);
