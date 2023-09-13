import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

export const selectOffers = (state: AppState) => state.offersModule.offers;

export const selectFilters = createSelector(
  selectOffers,
  state => state.filters
);

export const selectFilterCategory = createSelector(
  selectFilters,
  state => state.filtersCategory
);

export const selectFilterBrands = createSelector(
  selectFilters,
  state => state.filtersBrands
);

export const selectFilterShops = createSelector(
  selectFilters,
  state => state.filtersShops
);

export const selectFilterShipping = createSelector(
  selectFilters,
  state => state.filtersShipping
);

export const selectFilterColors = createSelector(
  selectFilters,
  state => state.filtersColors
);

export const selectFilterSize = createSelector(
  selectFilters,
  state => state.filtersSize
);

export const selectFilterPrice = createSelector(
  selectFilters,
  state => state.filtersPrices
);

export const selectFilterStatus = createSelector(
  selectFilters,
  state => state.filtersStatus
);

export const selectOffersList = createSelector(
  selectOffers,
  state => state.offers
);
export const selectJustDroppedOffersList = createSelector(
  selectOffers,
  state => state.offersJustDropped
);
export const selectRafflesOffersList = createSelector(
  selectOffers,
  state => state.offersRaffles
);

export const selectLoading = createSelector(
  selectOffers,
  state => state.loading
);

export const selectIsJustDropped = createSelector(
  selectOffers,
  state => state.isJustDropped
);

export const selectIsRaffle = createSelector(
  selectOffers,
  state => state.isRaffle
);

// Pagination
export const selectTotalOffers = createSelector(
  selectOffers,
  state => state.totalOffers
);

export const selectOffersCount = createSelector(
  selectOffers,
  state => state.offersCount
);

export const selectHottestReleases = createSelector(
  selectOffers,
  state => state.hottestReleases
);

export const selectStatusGroup = createSelector(
  selectOffers,
  state => state.currentStatusGroup
);

// Offer Details

export const selectSelectedOffer = createSelector(
  selectOffers,
  state => state.selectedOffer
);

export const selectOffersPinned = createSelector(
  selectOffers,
  state => state.offersPinned
);
// export const selectOffersPinned = createSelector(
//   selectOffersPinnedS,
//   (state: OfferState) => {
//     return state.offersPinned;
//   }
// );
