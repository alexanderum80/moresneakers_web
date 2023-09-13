import { Style } from '../home/models/style.model';
import { Blog, BlogState } from '../home/models/blog.model';
import { HomeLayout } from '../home/models/homeLayout.model';
import { Offer, OfferState } from '../home/models/offer.model';
import {
  Release,
  ReleaseOffersFilters,
  ReleaseShopOfferGroup,
  ReleaseState,
} from '../home/models/release.model';
import { Brand } from '../brand/models/brand';
import { CalendarDate } from '../release-calendar/models/release-calendar.models';
import { OptionSort } from '../home/models/sortOptions';
import { FilterPrice } from '../shared/classes/filter';
import { Category } from '../home/models/category.model';
import { Collection } from '../home/models/collection.model';
import { Deal } from '../deal/models/deal';

export interface AppState {
  homeModule: {
    offersPinned: OfferState;
    homeLayout: HomeLayout;
    offers: OfferState;
    releases: ReleaseState;
    blogs: BlogState;
  };
  releasesModule: {
    releases: {
      releases: Release[];
      loading: boolean;
      selectedRelease: Release;
      offers: ReleaseShopOfferGroup[];
      hottestReleases: Release[];
      loadingOffers: boolean;
      filtersOffers: ReleaseOffersFilters;
      currentCategory: string;
      filters: {
        filtersCategory: string[];
        filtersBrands: string[];
        filtersColors: string[];
        filtersSize: string[];
        filtersPrices: string[];
        filtersGender: string[];
        filtersStatus: string;
        filterName: string;
        onlyOnSale: boolean;
      };
      filtersNames: {
        gender: string;
        brand: string;
        color: string;
        category: string;
        onSale: false;
      };
      sortOption: OptionSort;
      totalReleases: number;
      releasesCount: number;
      currentStatusGroup: string;
      totalPages: number;
      currentPage: number;
    };
  };
  releasesCalendarModule: {
    releases: Release[];
    inlineRelease: Release[];
    loading: boolean;
    hottestReleases: Release[];
    upcomingReleases: Release[];
    selectedMonth: CalendarDate;
    previousMonth: CalendarDate;
    nextMonth: CalendarDate;
    section: string;
    offersPinned: OfferState;
  };
  brandsModule: {
    brands: {
      brands: Brand[];
      brand: Brand;
      filterLetter: string;
      loading: boolean;
      hottestReleases: Release[];
      totalPages: number;
      currentPage: number;
      totalBrands: number;
    };
  };
  blogsModule: {
    blogs: Blog[];
    loading: boolean;
    hottestReleases: Release[];
    totalPages: number;
    currentPage: number;
  };
  styleModule: {
    style: {
      releasesByStyle: Release[];
      count: number;
      style: Style;
      loading: boolean;
      sortOption: OptionSort;
      totalPages: number;
      currentPage: number;
      filters: {
        filtersCategory: string[];
        filtersShops: string[];
        filtersBrands: string[];
        filtersShipping: string[];
        filtersColors: string[];
        filtersGender: string[];
        filtersPrices: FilterPrice;
        onlyOnSale: boolean;
      };
      filtersNames: {
        gender: string;
        brand: string;
        color: string;
        category: string;
        onSale: false;
      };
    };
  };
  dealsModule: {
    deals: {
      deals: Deal[];
      loading: boolean;
      totalPages: number;
      currentPage: number;
      totalDeals: number;
      hottestReleases: Release[];
    };
  };
  collectionModule: {
    collection: {
      releasesByCollection: Release[];
      count: number;
      collection: Collection;
      loading: boolean;
      sortOption: OptionSort;
    };
  };
  shopsModule: {
    shops: {
      shops: any[];
      filterLetter: string;
      loading: boolean;
      hottestReleases: Release[];
    };
  };
  offersModule: {
    offers: {
      offersPinned: OfferState;
      offers: Offer[];
      offersJustDropped: Offer[];
      offersRaffles: Offer[];
      loading: boolean;
      isJustDropped: boolean;
      isRaffle: boolean;
      selectedOffer: Offer;
      filters: {
        filtersCategory: string[];
        filtersShops: string[];
        filtersBrands: string[];
        filtersShipping: string[];
        filtersColors: string[];
        filtersSize: string[];
        filtersPrices: FilterPrice;
        filtersStatus: string[];
      };
      sortOption: OptionSort;
      totalOffers: number;
      offersCount: number;
      hottestReleases: Release[];
      currentStatusGroup: string;
    };
  };
  categoriesModule: {
    categories: Category[];
    genders: Category[];
    hottestReleases: Release[];
  };
}
