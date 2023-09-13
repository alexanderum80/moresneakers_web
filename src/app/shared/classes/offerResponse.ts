import { Offer } from 'src/app/home/models/offer.model';

export interface OffersListResponse {
  data: Offer[];
  dataCount: number;
}

export interface OfferResponse {
  data: Offer;
}
