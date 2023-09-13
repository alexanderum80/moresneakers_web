import { createReducer, on } from '@ngrx/store';
import {
  getAllJustDroppedOffer,
  getAllRafflesOffer,
  getOffers,
  getOffersCount,
  getOffersJustDropNextPage,
  getOffersNextPage,
  getOffersPinned,
  getOffersRafflesNextPage,
  setFiltersBrands,
  setFiltersCategory,
  setFiltersColor,
  setFiltersPrice,
  setFiltersShipping,
  setFiltersShops,
  setFiltersSize,
  setFiltersStatus,
  setHottestReleases,
  setIsJustDropped,
  setIsRaffle,
  setLoading,
  setSelectedOffer,
  setSortOptions,
  setTotalOffers,
} from './offer.action';

export const initialState = {
  offers: [],
  offersJustDropped: [],
  offersRaffles: [],
  selectedOffer: null,
  loading: false,
  filters: {
    filtersCategory: [],
    filtersShops: [],
    filtersBrands: [],
    filtersShipping: [],
    filtersColors: [],
    filtersSize: [],
    filtersPrices: { min: 0, max: 1000 },
    filtersStatus: [],
  },
  sortOption: null,
  totalOffers: 0,
  offersCount: 0,
  hottestReleases: [],
};

export const offerReducer = createReducer(
  initialState,
  on(getOffers, (state, { offers }) => ({
    ...state,
    offers: [...offers],
    offersCount: offers.length,
  })),
  on(getAllJustDroppedOffer, (state, { offersJustDropped }) => ({
    ...state,
    offersJustDropped,
    offersCount: offersJustDropped.length,
  })),
  on(getAllRafflesOffer, (state, { offersRaffles }) => ({
    ...state,
    offersRaffles: [...offersRaffles],
    offersCount: offersRaffles.length,
  })),
  on(getOffersNextPage, (state, { offers }) => ({
    ...state,
    offers: [...state.offers, ...offers],
    offersCount: state.offers.length + offers.length,
  })),
  on(getOffersJustDropNextPage, (state, { offersJustDropped }) => ({
    ...state,
    offersJustDropped: [...state.offersJustDropped, ...offersJustDropped],
    offersCount: state.offersJustDropped.length + offersJustDropped.length,
  })),
  on(getOffersRafflesNextPage, (state, { offersRaffles }) => ({
    ...state,
    offersRaffles: [...state.offersRaffles, ...offersRaffles],
    offersCount: state.offersRaffles.length + offersRaffles.length,
  })),
  on(setFiltersCategory, (state, { category }) => ({
    ...state,
    filters: { ...state.filters, filtersCategory: category },
  })),
  on(setFiltersShops, (state, { shops }) => ({
    ...state,
    filters: { ...state.filters, filtersShops: shops },
  })),
  on(setFiltersBrands, (state, { brands }) => ({
    ...state,
    filters: { ...state.filters, filtersBrands: brands },
  })),
  on(setFiltersShipping, (state, { shipping }) => ({
    ...state,
    filters: { ...state.filters, filtersShipping: shipping },
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
  on(setSortOptions, (state, { sortOption }) => ({
    ...state,
    sortOption,
  })),
  on(getOffersCount, state => ({
    ...state,
  })),
  on(getOffersPinned, (state, payload) => {
    return {
      ...state,
      offersPinned: payload.offersPinned,
    };
  }),
  on(setTotalOffers, (state, { total }) => ({
    ...state,
    totalOffers: total,
  })),
  on(setSelectedOffer, (state, { offer }) => ({
    ...state,
    selectedOffer: offer,
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(setIsJustDropped, (state, { isJustDropped }) => ({
    ...state,
    isJustDropped,
  })),
  on(setIsRaffle, (state, { isRaffle }) => ({
    ...state,
    isRaffle,
  })),
  on(setHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: releases,
  }))
);
