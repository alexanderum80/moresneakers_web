import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Brand, BrandResponse, BrandsListResponse } from '../models/brand';
import { environment } from 'src/environments/environment';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  apiEndpoint = `${environment.apiUrl}brands/`;
  public brandsList = new BehaviorSubject<BrandsListResponse>({
    dataCount: 0,
    data: [],
  });

  constructor(private http: HttpClient) {}

  getBrands(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<BrandsListResponse> {
    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );

    return this.http.get<BrandsListResponse>(this.apiEndpoint + queryParams);
  }

  getBrand(id: string): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(this.apiEndpoint + id + '/');
  }

  postBrandLinkedShops(id: string, data: Array<string>): Observable<Brand> {
    return this.http.post<Brand>(
      this.apiEndpoint + id + '/shops/',
      JSON.stringify(data)
    );
  }

  getBrandLinkedShops(id: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + id + '/shops/');
  }

  putBrand(data: Brand): Observable<Brand> {
    return this.http.put<Brand>(
      this.apiEndpoint + data.id + '/',
      JSON.stringify(data)
    );
  }

  deleteBrand(id: string): Observable<any> {
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

    if (filter.name && filter.name.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `name=${filter.name}`;
    }

    if (filter.init && filter.init.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `init=${filter.init}`;
    }

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

    return queryParams;
  }

  getAllBrands(): Observable<Brand[]> {
    const queryParams = {
      ordering: 'name',
    };
    return this.http
      .get<{ data: Brand[] }>(this.apiEndpoint, { params: queryParams })
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }
}
