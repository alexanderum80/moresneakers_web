import { createReducer, on } from '@ngrx/store';
import {
  clearFilters,
  clearReleases,
  clearState,
  concatOffersOfRelease,
  getHottestReleases,
  getReleases,
  getReleasesNextPage,
  resetOffers,
  resetReleaseState,
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
  setFiltersOffers,
  setFiltersPrice,
  setFiltersSize,
  setFiltersStatus,
  setLoading,
  setLoadingOffers,
  setOffersOfRelease,
  setSelectedRelease,
  setSortOptions,
  setStatusGroup,
  setTotalPages,
  setTotalReleases,
} from './release.action';

export const initialState = {
  releases: [],
  loading: false,
  selectedRelease: null,
  hottestReleases: [],
  offers: [],
  currentCategory: '',
  filtersOffers: {},
  loadingOffers: false,
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
  sortOption: null,
  totalReleases: 0,
  currentStatusGroup: 'in-stock',
  totalPages: 1,
  currentPage: 1,
};

export const releaseReducer = createReducer(
  initialState,
  on(getReleases, (state, { releases }) => ({
    ...state,
    releases: [...releases],
  })),
  on(getReleasesNextPage, (state, { releases }) => ({
    ...state,
    releases: [/* ...state.releases, */ ...releases],
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
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
  on(setFiltersStatus, (state, { status }) => ({
    ...state,
    filters: { ...state.filters, filtersStatus: status },
  })),
  on(setTotalReleases, (state, { total }) => ({
    ...state,
    totalReleases: total,
  })),
  on(setSortOptions, (state, { sortOption }) => ({
    ...state,
    sortOption,
  })),
  on(clearFilters, state => ({
    ...state,
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
  })),
  on(clearState, state => ({
    ...state,
    ...initialState,
  })),
  // release details
  on(setSelectedRelease, (state, { release }) => ({
    ...state,
    selectedRelease: release,
  })),
  on(setLoadingOffers, (state, { loading }) => ({
    ...state,
    loadingOffers: loading,
  })),
  on(resetOffers, state => ({
    ...state,
    offers: [],
  })),
  on(setOffersOfRelease, (state, { offers }) => ({
    ...state,
    offers,
  })),
  on(concatOffersOfRelease, (state, { offers }) => ({
    ...state,
    offers: [...state.offers, ...offers],
  })),
  on(setFiltersOffers, (state, { filters }) => ({
    ...state,
    filtersOffers: filters,
  })),
  on(resetReleaseState, state => ({
    ...state,
    ...initialState,
  })),
  on(getHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: releases,
  })),
  on(setStatusGroup, (state, { statusGroup }) => ({
    ...state,
    currentStatusGroup: statusGroup,
  })),
  on(setTotalPages, (state, { pageSize = 28 }) => ({
    ...state,
    totalPages: Math.ceil(state.totalReleases / pageSize),
  })),
  on(clearReleases, state => ({
    ...state,
    releases: [],
  })),
  on(setCurrentPage, (state, { current }) => ({
    ...state,
    currentPage: +current,
  })),
  on(setFiltersNames, (state, { filtersNames }) => ({
    ...state,
    filtersNames,
  }))
);
