import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  OfferResponse,
  OffersListResponse,
} from 'src/app/shared/classes/offerResponse';
import { Offer } from '../models/offer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  apiEndpoint = `${environment.apiUrl}offers/`;

  public offersList = new BehaviorSubject<OffersListResponse>({
    dataCount: 0,
    data: [],
  });

  constructor(private http: HttpClient) {}

  //
  // Begin functions that most services have.
  //

  getOffers(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    full?: boolean
  ): Observable<OffersListResponse> {
    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );

    const fullQueryParam = full ? '?full=true' : '';
    return this.http.get<OffersListResponse>(
      this.apiEndpoint + fullQueryParam + queryParams
    );
  }

  postOffer(data: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.apiEndpoint, JSON.stringify(data));
  }

  getOffer(id: string): Observable<OfferResponse> {
    return this.http.get<OfferResponse>(this.apiEndpoint + id + '/');
  }

  getRaffleOffer(releaseId: string): Observable<any> {
    return this.http.get<any>(
      this.apiEndpoint + '?raffle=1&active=1&releaseId=' + releaseId
    );
  }

  getAllWahtsNewOffer(): Observable<any> {
    return this.http.get<any>(
      this.apiEndpoint + '?displayWhatsNew=1&active=1&ordering=-updatedAt'
    );
  }

  getOffersPinned(): Observable<any> {
    return this.http.get<any>(
      this.apiEndpoint + '?isPinned=1&active=1&ordering=-updatedAt'
    );
  }

  getNoRaffleOffer(releaseId: string): Observable<any> {
    return this.http.get<any>(
      this.apiEndpoint + '?raffle=0&active=1&releaseId=' + releaseId
    );
  }

  getReleaseOffer(releaseId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + '?releaseId=' + releaseId);
  }

  postWhatsNewOffers(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiEndpoint + 'search/',
      JSON.stringify(data)
    );
  }

  posOffersSearch(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiEndpoint + 'search/',
      JSON.stringify(data)
    );
  }

  putOffer(data: Offer): Observable<Offer> {
    return this.http.put<Offer>(
      this.apiEndpoint + data.id + '/',
      JSON.stringify(data)
    );
  }

  deleteOffer(id: string): Observable<any> {
    return this.http.delete<any>(this.apiEndpoint + id + '/');
  }

  formatQueryParams(
    filter?: any,
    sortColumn?: string,
    sortDirection?: string,
    pageIndex?: number,
    pageSize?: number
  ): string {
    let queryParams = '';

    if (filter.collectionId && filter.collectionId.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `collectionId=${filter.collectionId}`;
    }

    if (filter.shopId && filter.shopId.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `shopId=${filter.shopId}`;
    }

    if (filter.sku && filter.sku.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `sku=${filter.sku}`;
    }

    if (filter.status && filter.status.length > 0) {
      filter.status.forEach(statusId => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `status=${statusId}`;
      });
    }

    if (filter.shipping && filter.shipping.length > 0) {
      filter.shipping.forEach(shippingId => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `shipping=${shippingId}`;
      });
    }

    if (filter.notStatus && filter.notStatus.length > 0) {
      filter.notStatus.forEach(status => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `notStatus=${status}`;
      });
    }

    if (filter.categoryId && filter.categoryId.length > 0) {
      filter.categoryId.forEach(category => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `categoryId=${category}`;
      });
    }

    if (filter.date && filter.date.length > 0) {
      queryParams += `?date=${filter.date}`;
    }

    if (filter.brandId && filter.brandId.length > 0) {
      filter.brandId.forEach(brandId => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `brandId=${brandId}`;
      });
    }

    if (filter.gender && filter.gender.length > 0) {
      filter.gender.forEach(genderId => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `gender=${genderId}`;
      });
    }

    if (filter.color && filter.color.length > 0) {
      filter.color.forEach(colorId => {
        queryParams += queryParams.length ? '&' : '?';
        queryParams += `color=${colorId}`;
      });
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
      queryParams += `maxPrice=${filter.maxPriceEUR}&currency=EUR`;
    }

    if (filter.minPriceEUR) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `minPrice=${filter.minPriceEUR}&currency=EUR`;
    }

    if (filter.maxPriceGBP) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `maxPrice=${filter.maxPriceGBP}&currency=GBP`;
    }

    if (filter.minPriceGBP) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `minPrice=${filter.minPriceGBP}&currency=GBP`;
    }

    if (filter.maxPriceUSD) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `maxPrice=${filter.maxPriceUSD}&currency=USD`;
    }

    if (filter.minPriceUSD) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `minPrice=${filter.minPriceUSD}&currency=USD`;
    }

    if (filter.displayWhatsNew) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `displayWhatsNew=${filter.displayWhatsNew}`;
    }

    if (filter.isRaffle === true || filter.isRaffle === false) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `isRaffle=${filter.isRaffle}`;
    }

    if (filter.last12h || filter.last12h === '') {
      queryParams += `&last12h=${filter.last12h}`;
    }

    if (filter.last24h || filter.last24h === '') {
      queryParams += `&last24h=${filter.last24h}`;
    }

    if (filter.next48h || filter.next48h === '') {
      queryParams += `&next48h=${filter.next48h}`;
    }

    if (filter.raffleEndLastWeek || filter.raffleEndLastWeek === '') {
      queryParams += `&raffleEndLastWeek=${filter.raffleEndLastWeek}`;
    }

    if (filter.hasReleaseTime || filter.hasReleaseTime === '') {
      queryParams += `&hasReleaseTime=${filter.hasReleaseTime}`;
    }

    if (
      filter.raffleEndBeforeTodayNoStatus ||
      filter.raffleEndBeforeTodayNoStatus === ''
    ) {
      queryParams += `&raffleEndBeforeTodayNoStatus=${filter.raffleEndBeforeTodayNoStatus}`;
    }

    // By default only active shop offer
    queryParams += queryParams.length ? '&' : '?';
    queryParams += `active=1`;

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

  //
  // End functions that most services have.
  //

  //
  // Begin special functions specific to only this service.
  //

  getAllOffers(): Observable<Offer[]> {
    return this.http
      .get<{ data: Offer[] }>(this.apiEndpoint + '?active=1')
      .pipe(
        map((response: OffersListResponse) => {
          return response.data;
        })
      );
  }

  getAllOffersDisplayOnSale(): Observable<Offer[]> {
    return this.http
      .get<{ data: Offer[] }>(
        this.apiEndpoint + '?displayOnSale=1&active=1&ordering=-updatedAt'
      )
      .pipe(
        map((response: OffersListResponse) => {
          return response.data;
        })
      );
  }

  //
  // End special functions specific to only this service.
  //
  getAllComingSoonOffer(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );
    return this.http.get<any>(
      this.apiEndpoint + 'about-to-drop/coming-soon/' + queryParams
    );
  }

  getAllJustDroppedOffer(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );
    return this.http.get<any>(
      this.apiEndpoint + 'about-to-drop/just-dropped/' + queryParams
    );
  }
}
