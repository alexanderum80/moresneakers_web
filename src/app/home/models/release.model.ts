import { Category } from './category.model';
import { Collection } from './collection.model';
import { Offer } from './offer.model';
import { Shop } from './shop.model';
import { Style } from './style.model';

export interface ReleaseImage {
  id?: string;

  createdBy?: string;

  updatedBy?: string;

  createdAt?: string;

  updatedAt?: string;

  fileName?: string;

  imgUrl?: string;

  status?: string;

  mainImage?: boolean;
}

export interface Release {
  id?: string;

  name: string;

  slug: string;

  status?: string;

  collectionId?: string;

  children?: boolean;

  color?: any;

  currency?: string;

  description?: string;

  sku?: string;

  images?: ReleaseImage[];

  gender?: string;

  hot?: boolean;

  mainImage?: string;

  price?: number;

  priceEUR?: number;
  priceGBP?: number;
  priceUSD?: number;

  shipping?: string;

  releaseDate?: Date;

  updatedAt?: Date;

  createdAt?: Date;

  // faces?: Array<Face>;

  supplierColor?: string;

  upcoming?: boolean;

  customized?: boolean;

  inlineRelease?: boolean;

  styleId?: string;

  brandId?: string;

  collection?: Collection;

  offers?: any;

  categories?: Category[];

  style: Style;

  countries?: string;

  keywords?: string;

  thumbnail?: string;

  meta_description?: string;
}

export interface ReleasesListResponse {
  data: Release[];
  dataCount: number;
}

export interface ReleasesImagesListResponse {
  data: ReleaseImage[];
  dataCount: number;
}

export interface ReleaseResponse {
  data: Release;
}

export interface ReleaseImagesResponse {
  data: ReleaseImage;
}

export interface EditReleaseModel extends Release {
  deletedFaces?: Array<string>;
}

export interface ReleaseShopOffer {
  shopName?: string;
  logo?: string;
  status?: string;
  shipping?: string;
  links?: any[];
  rank?: number;
  parentShop?: string;
  pickUp?: string; // raffle
  date?: string; // raffle
  shopParentObject?: Shop;
}

export interface ReleaseShopOfferGroup {
  shopId?: string;
  rank?: string;
  shopName?: string;
  showOnRegion?: string;
  region: string;
  status?: string;
  logo?: string;
  offers: Offer[];
  isRaffle: boolean;
}

export interface ReleaseSameReleaseGroup {
  offers: Offer[];
  release?: string;
  groups?: ReleaseShopOfferGroup[];
}

export interface ReleaseState {
  lastestReleases?: Release[];
  upcomingReleases?: Release[];
  hottestReleases?: Release[];
}

export interface ReleaseOffersFilters {
  shipping?: string;
  raffle?: boolean;
}

export interface ReleaseGroupPagination {
  name: string;
  href: string;
}
