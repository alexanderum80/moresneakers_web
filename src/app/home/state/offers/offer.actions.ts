import { createAction, props } from '@ngrx/store';
import { Offer } from '../../models/offer.model';

export const getOffersWhatsNew = createAction(
  '[HOME PAGE] Get Offers Whats new',
  props<{ offers: Offer[] }>()
);

export const getOffersPinned = createAction(
  '[HOME PAGE] Get Offers Pinned',
  props<{ offersPinned: Offer[] }>()
);
export const getShowOffersPinned = createAction(
  '[HOME PAGE] Get Show Offers Pinned',
  props<{
    showOffersPinned: {
      Home: boolean;
      ReleaseCalendar: boolean;
      AboutToDrop: boolean;
    };
  }>()
);
