import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { BrandsListResponse } from '../../brand/models/brand';
import { HttpClient } from '@angular/common/http';
import { DealsListResponse } from '../models/deal';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  apiEndpoint = `${environment.apiUrl}deals/`;

  public deals = new BehaviorSubject<BrandsListResponse>({
    dataCount: 0,
    data: [],
  });

  constructor(private http: HttpClient) {}

  getDeals(pageIndex: number, pageSize: number): Observable<DealsListResponse> {
    const queryParams = this.formatQueryParams(
      'endDate',
      'asc',
      true,
      true,
      pageIndex,
      pageSize
    );

    return this.http.get<DealsListResponse>(this.apiEndpoint + queryParams);
  }

  formatQueryParams(
    sortColumn?: string,
    sortDirection?: string,
    excludeAfter24hEnded = true,
    excludeExpired = true,
    pageIndex?: number,
    pageSize?: number
  ): string {
    let queryParams = '';

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
      queryParams += `offset=${(pageIndex - 1) * pageSize}`;
    }

    if (pageSize !== undefined) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `limit=${pageSize}`;
    }

    if (excludeExpired) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `excludeExpired=true`;
    }

    if (excludeAfter24hEnded) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `excludeAfter24hEnded=true`;
    }

    return queryParams;
  }
}
