import { createReducer, on } from '@ngrx/store';
import { OfferState } from '../../models/offer.model';
import {
  getOffersPinned,
  getOffersWhatsNew,
  getShowOffersPinned,
} from './offer.actions';

export const initialState: OfferState = {};

export const offerReducer = createReducer(
  initialState,
  on(getOffersWhatsNew, (state, payload) => ({
    ...state,
    whatsNew: [...payload.offers],
  })),
  on(getOffersPinned, (state, payload) => ({
    ...state,
    offersPinned: [...payload.offersPinned],
  })),
  on(getShowOffersPinned, (state, payload) => ({
    ...state,
    showOffersPinned: payload.showOffersPinned,
  }))
);
