import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { OfferState } from '../../models/offer.model';

export const selectOffers = (state: AppState) => {
  return state.homeModule.offers;
};

export const selectwhatsNewOffers = createSelector(
  selectOffers,
  (state: OfferState) => {
    return state.whatsNew;
  }
);

export const selectOffersPinned = createSelector(
  selectOffers,
  (state: OfferState) => {
    return state.offersPinned;
  }
);

export const selectShowOffersPinned = createSelector(
  selectOffers,
  (state: OfferState) => {
    return state.showOffersPinned;
  }
);
