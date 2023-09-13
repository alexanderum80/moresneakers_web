import { createReducer, on } from '@ngrx/store';
import {
  concatReleasesByStyle,
  getReleasesByStyle,
  setCategory,
  setCurrentPage,
  setFilterOnlyOnSale,
  setFilters,
  setFiltersBrands,
  setFiltersCategory,
  setFiltersColor,
  setFiltersGender,
  setFiltersName,
  setFiltersNames,
  setFiltersPrice,
  setFiltersSize,
  setLoading,
  setReleasesByStyleCount,
  setSortOptions,
  setStyle,
  setTotalPages,
} from './style.action';

export const initialState = {
  releasesByStyle: [],
  style: null,
  loading: false,
  sortOption: null,
  totalPages: 1,
  currentPage: 1,
  count: 0,
  filters: {
    filtersCategory: [],
    filtersBrands: [],
    filtersColors: [],
    filtersSize: [],
    filtersPrices: ['0', '1000'],
    filtersStatus: 'available',
    filtersGender: ['All'],
    filterName: '',
    onlyOnSale: false,
  },
  filtersNames: {
    gender: 'All',
    brand: '',
    color: '',
    category: '',
    onSale: false,
  },
};

export const styleReducer = createReducer(
  initialState,
  on(getReleasesByStyle, (state, { releasesByStyle }) => ({
    ...state,
    releasesByStyle,
  })),
  on(concatReleasesByStyle, (state, { releasesByStyle }) => ({
    ...state,
    releasesByStyle: [...state.releasesByStyle, ...releasesByStyle],
  })),
  on(setReleasesByStyleCount, (state, { count }) => ({
    ...state,
    count,
  })),
  on(setStyle, (state, { style }) => ({
    ...state,
    style,
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(setSortOptions, (state, { sortOption }) => ({
    ...state,
    sortOption,
  })),
  on(setTotalPages, (state, { pageSize = 28 }) => ({
    ...state,
    totalPages: Math.ceil(state.count / pageSize),
  })),
  on(setCurrentPage, (state, { current = 1 }) => ({
    ...state,
    currentPage: +current,
  })),
  on(setCategory, (state, { category }) => ({
    ...state,
    currentCategory: category,
  })),
  on(setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters },
  })),
  on(setFilterOnlyOnSale, (state, { onlyOnSale }) => ({
    ...state,
    filters: { ...state.filters, onlyOnSale },
  })),
  on(setFiltersCategory, (state, { category }) => ({
    ...state,
    filters: { ...state.filters, filtersCategory: category },
  })),
  on(setFiltersGender, (state, { gender }) => ({
    ...state,
    filters: { ...state.filters, filtersGender: gender },
  })),
  on(setFiltersName, (state, { name }) => ({
    ...state,
    filters: { ...state.filters, filterName: name },
  })),
  on(setFiltersBrands, (state, { brands }) => ({
    ...state,
    filters: { ...state.filters, filtersBrands: brands },
  })),
  on(setFiltersColor, (state, { colors }) => ({
    ...state,
    filters: { ...state.filters, filtersColors: colors },
  })),
  on(setFiltersSize, (state, { sizes }) => ({
    ...state,
    filters: { ...state.filters, filtersSize: sizes },
  })),
  on(setFiltersPrice, (state, { prices }) => ({
    ...state,
    filters: { ...state.filters, filtersPrices: prices },
  })),
  on(setFiltersNames, (state, { filtersNames }) => ({
    ...state,
    filtersNames,
  }))
);
