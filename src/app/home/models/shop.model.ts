export interface Shop {
  active?: boolean;

  address?: string;

  brand?: string;

  category?: string;

  createdAt?: Date;

  currency?: string;

  createdBy?: Date;

  description?: string;

  faces?: Array<any>;

  id?: string;

  images?: Array<any>;

  makeDeal?: boolean;

  mainImage?: string;

  smallImage?: string;

  headerImage?: string;

  name: string;

  rank?: string;

  region?: string;

  country?: string;

  shippingDetails?: string;

  shippingCountries?: string;

  showOnRegion?: string;

  countries?: any;

  trackingListBaseUrl?: string;

  updatedAt?: Date;

  workingHours?: Array<WeekHours>;

  linked?: boolean;

  checked?: boolean;

  zipCode?: string;

  isParent?: boolean;

  parent?: string;

  parentShop?: Shop;

  lat?: number;

  lon?: number;

  type?: string;
}

export interface ShopsListResponse {
  data: Shop[];
  dataCount: number;
}

export interface ShopsResponse {
  data: Shop;
}

export interface ShopsImagesListResponse {
  data: Array<any>;
  dataCount: number;
}

export interface ShopImagesResponse {
  data: any[];
}

export interface WeekHours {
  dayOfWeek?: number;
  openHour?: string;
  closeHour?: string;
  shopId?: string;
  notWorking?: boolean;
}

export interface ShopImage {
  id?: string;

  createdBy?: string;

  updatedBy?: string;

  createdAt?: string;

  updatedAt?: string;

  fileName?: string;

  imgUrl?: string;

  state?: any;

  status?: any;

  file?: File;

  mainImage?: boolean;
}
