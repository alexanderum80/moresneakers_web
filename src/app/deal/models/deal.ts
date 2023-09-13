import { Shop } from '../../home/models/shop.model';
import { link } from '../../home/models/offer.model';

export interface Deal {
  createdAt?: string;
  displayOnSale?: boolean;
  id?: string;
  imgUrl?: string;
  promoCode?: string;
  salePercentage?: string;
  status?: 'Live' | 'Coming Soon' | 'Expired';
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  time?: string;
  shopId?: string;
  updatedAt?: string;
  links?: link[];
  shop?: Shop;
  description?: string;
}

export interface DealsListResponse {
  data: Deal[];
  dataCount: number;
}
