import { Release } from './release.model';
import { Shop } from './shop.model';

export interface link {
  text: string;
  url: string;
  trackedUrl: string;
  bitlyUrl: string;
}

export interface Offer {
  description?: string;

  offerDate?: Date;

  id?: string;

  name: string;

  timezone: string;

  imgUrl?: string;

  updatedAt?: string;

  createdAt?: string;

  shopId?: string;

  retailPrice?: number;

  retailCurrency?: string;

  status?: string;

  releaseId?: string;

  releaseTime?: string;

  releaseTimeZone?: string;

  release?: Release;

  raffleTimeStart?: string;

  raffleTimeEnd?: string;

  raffleEnd?: string;

  salePrice?: number;

  salePercentage?: number;

  displayOnWhatsNew?: boolean;

  price?: number;

  priceEUR?: number;

  priceGBR?: number;

  priceUSD?: number;

  links?: link[];

  raffle?: any;

  linked?: boolean;

  checked?: boolean;

  displayWhatsNew?: boolean;

  shop?: Shop;

  currency?: string;

  countries?: string;

  discountCode?: string;

  shipping?: string;
}

export interface OfferState {
  offersPinned?: Offer[];
  showOffersPinned?: {
    Home: boolean;
    ReleaseCalendar: boolean;
    AboutToDrop: boolean;
  };
  whatsNew?: Offer[];
}

export const SHIPPING_REGIONS = [
  {
    id: 'worldwide',
    name: 'Worldwide',
  },
  {
    id: 'emea',
    name: 'EMEA',
  },
  {
    id: 'europe',
    name: 'Europe',
  },
  {
    id: 'usa',
    name: 'USA',
  },
];
