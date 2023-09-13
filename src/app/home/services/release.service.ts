import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/classes/pagination';
import { environment } from 'src/environments/environment';
import {
  Release,
  ReleaseResponse,
  ReleasesListResponse,
} from '../models/release.model';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class ReleasesService {
  apiEndpoint = `${environment.apiUrl}releases/`;

  constructor(private http: HttpClient) {}

  getReleases(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    full?: boolean
  ): Observable<ReleasesListResponse> {
    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize,
      full
    );

    return this.http.get<ReleasesListResponse>(this.apiEndpoint + queryParams);
  }

  getReleasesByStatusGroup(
    statusGroup: string,
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<ReleasesListResponse> {
    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );

    return this.http.get<any>(
      `${this.apiEndpoint}by-status-group/${statusGroup}/${queryParams}`
    );
  }

  postRelease(data: Release): Observable<ReleaseResponse> {
    return this.http.post<ReleaseResponse>(
      this.apiEndpoint,
      JSON.stringify(data)
    );
  }

  postReleasesCalendar(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiEndpoint + 'search/',
      JSON.stringify(data)
    );
  }

  postReleasesSearch(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiEndpoint + 'search/',
      JSON.stringify(data)
    );
  }

  getReleasesSearch(
    search: string,
    pageIndex: number,
    pageSize: number,
    sortDirection: string,
    sortColumn: string
  ): Observable<any> {
    const queryParams = this.formatQueryParams(
      '',
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );

    return this.http.get<any>(
      this.apiEndpoint + `${search}/search/${queryParams}`
    );
  }

  getRelease(id: string): Observable<ReleaseResponse> {
    return this.http.get<ReleaseResponse>(this.apiEndpoint + id + '/');
  }

  getReleaseBySlug(slug: string): Observable<ReleaseResponse> {
    return this.http.get<ReleaseResponse>(
      this.apiEndpoint + '?slug=' + slug + '&activeShop=1'
    );
  }

  getOnlyOffersOfReleaseBySlug(
    slug: string,
    page: number = 1,
    filters: any = {}
  ): Observable<any> {
    const queryParams = this.formatQueryParams(
      filters,
      '',
      '',
      page,
      DEFAULT_PAGE_SIZE
    );

    return this.http.get<any>(
      `${this.apiEndpoint}by-slug/${slug}/offers${queryParams}`
    );
  }

  getReleaseAllImages(id: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + id + '/images/');
  }

  getReleasesByDateInterval(dateInterval: string): Observable<ReleaseResponse> {
    return this.http.get<ReleaseResponse>(
      this.apiEndpoint + '/date_interval=' + dateInterval + '/'
    );
  }

  getReleaseStores(id: string): Observable<ReleaseResponse> {
    return this.http.get<ReleaseResponse>(this.apiEndpoint + id + '/stores/');
  }

  getReleasesUpcoming(upcoming: boolean): Observable<any> {
    let upcomingQuery = 'upcoming=0';
    if (upcoming) {
      upcomingQuery = 'upcoming=1';
    }
    return this.http.get<any>(
      this.apiEndpoint +
        '?' +
        upcomingQuery +
        '&activeShop=1&ordering=-updatedAt&pageIndex=1&pageSize=4'
    );
  }

  getReleasesByStyle(
    styleId: string,
    pageIndex = 1,
    pageSize = 28,
    ordering = 'releaseDate',
    filters = {}
  ): Observable<any> {
    let queryParams = this.formatQueryParams(filters);

    if (queryParams.startsWith('?')) {
      queryParams = `&${queryParams.substr(1)}`;
    }
    return this.http.get<any>(
      `${this.apiEndpoint}?styleId=${styleId}&activeShop=1&ordering=${ordering}&pageIndex=${pageIndex}&pageSize=${pageSize}${queryParams}`
    );
  }

  putRelease(data: Release): Observable<Release> {
    return this.http.put<Release>(
      this.apiEndpoint + data.id + '/',
      JSON.stringify(data)
    );
  }

  formatQueryParams(
    filter?: any,
    sortColumn?: string,
    sortDirection?: string,
    pageIndex?: number,
    pageSize?: number,
    full?: boolean
  ): string {
    let queryParams = '';

    if (full) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `full=${full}`;
    }

    if (filter.shipping && filter.shipping.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `shipping=${filter.shipping}`;
    }

    if (filter.raffle || filter.raffle === false) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `raffle=${filter.raffle ? 1 : 0}`;
    }

    if (filter.inlineRelease || filter.inlineRelease === false) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `inlineRelease=${filter.inlineRelease ? 1 : 0}`;
    }

    if (filter.fromDate && filter.fromDate.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `fromDate=${filter.fromDate}`;
    }

    if (filter.toDate && filter.toDate.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `toDate=${filter.toDate}`;
    }

    if (filter.sku && filter.sku.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `sku=${filter.sku}`;
    }

    if (filter.name && filter.name.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `name=${filter.name}`;
    }

    if (filter.brandId && filter.brandId.length > 0) {
      filter.brandId.forEach(f => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `brandId=${f}`;
      });
    }

    if (filter.styleId && filter.styleId.length > 0) {
      filter.styleId.forEach(f => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `styleId=${f}`;
      });
    }

    if (filter.collectionId && filter.collectionId.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `collectionId=${filter.collectionId}`;
    }

    if (filter.categoryId && filter.categoryId.length > 0) {
      filter.categoryId.forEach(f => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `categoryId=${f}`;
      });
    }

    if (filter.category && filter.category.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `category=${filter.category}`;
    }

    if (filter.color && filter.color.length > 0) {
      filter.color.forEach(colorId => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `color=${colorId}`;
      });
    }

    if (filter.gender && filter.gender.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `gender=${filter.gender}`;
    }

    if (filter.outdated) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `outdated=${filter.outdated}`;
    }

    if (filter.upcoming) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `upcoming=${filter.upcoming}`;
    }

    if (filter.coming) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `coming=${filter.coming}`;
    }

    if (filter.maxPrice) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `maxPrice=${filter.maxPrice}`;
    }

    if (filter.minPrice || filter.minPrice === 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `minPrice=${filter.minPrice}`;
    }

    if (filter.maxPriceEUR) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `maxPriceEUR=${filter.maxPriceEUR}`;
    }

    if (filter.minPriceEUR) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `minPriceEUR=${filter.minPriceEUR}`;
    }

    if (filter.maxPriceGBP) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `maxPriceGBP=${filter.maxPriceGBP}`;
    }

    if (filter.minPriceGBP) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `minPriceGBP=${filter.minPriceGBP}`;
    }

    if (filter.maxPriceUSD) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `maxPriceUSD=${filter.maxPriceUSD}`;
    }

    if (filter.minPriceUSD) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `minPriceUSD=${filter.minPriceUSD}`;
    }

    if (filter.status) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `status=${filter.status}`;
    }
    if (filter.onlyOnSale) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `onlyOnSale`;
    }

    // By default only active shop offer
    queryParams += queryParams.length ? '&' : '?';
    queryParams += `activeShop=1`;

    if (sortColumn) {
      let ordering = '';

      if (sortDirection === 'desc') {
        ordering = '-';
      }
      ordering += sortColumn;
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `ordering=${ordering}`;
    }

    if (pageIndex !== undefined) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `pageIndex=${pageIndex}`;
    }

    if (pageSize !== undefined) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `pageSize=${pageSize}`;
    }

    return queryParams;
  }

  getAllReleasesByBrand(brandId: string): Observable<Release[]> {
    return this.http
      .get<{ data: Release[] }>(
        this.apiEndpoint + '?brandId=' + brandId + '&activeShop=1'
      )
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  getAllHottestReleases(countReleases = 36): Observable<Release[]> {
    return this.http
      .get<{ data: Release[] }>(
        this.apiEndpoint +
          `?hot=1&activeShop=1&limit=${countReleases}&ordering=-updatedAt`
      )
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }
}
