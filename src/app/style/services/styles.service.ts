import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Style,
  StyleResponse,
  StylesListResponse,
} from 'src/app/home/models/style.model';
import { environment } from 'src/environments/environment';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class StylesService {
  apiEndpoint = `${environment.apiUrl}styles/`;

  previousFilter: any = {};

  previousSortColumn = 'updatedAt';

  previousSortDirection = 'desc';

  previousPageIndex = 0;

  previousPageSize = 10;

  public stylesList = new BehaviorSubject<StylesListResponse>({
    dataCount: 0,
    data: [],
  });

  constructor(private http: HttpClient) {}

  getStyles(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<StylesListResponse> {
    this.previousFilter = filter;
    this.previousSortColumn = sortColumn;
    this.previousSortDirection = sortDirection;
    this.previousPageIndex = pageIndex;
    this.previousPageSize = pageSize;

    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );
    return this.http.get<StylesListResponse>(this.apiEndpoint + queryParams);
  }

  reloadStyles(): Observable<StylesListResponse> {
    return this.getStyles(
      this.previousFilter,
      this.previousSortColumn,
      this.previousSortDirection,
      this.previousPageIndex,
      this.previousPageSize
    );
  }

  postStyle(data: Style): Observable<any> {
    return this.http.post<any>(this.apiEndpoint, JSON.stringify(data));
  }

  postStyleLinkedShops(id: string, data: Array<string>): Observable<Style> {
    return this.http.post<Style>(
      this.apiEndpoint + id + '/shops/',
      JSON.stringify(data)
    );
  }

  getStyleLinkedShops(id: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + id + '/shops/');
  }

  getStyle(id: string): Observable<StyleResponse> {
    return this.http.get<StyleResponse>(this.apiEndpoint + id + '/');
  }

  putStyle(data: Style): Observable<Style> {
    return this.http.put<Style>(
      this.apiEndpoint + data.id + '/',
      JSON.stringify(data)
    );
  }

  deleteStyle(id: string): Observable<any> {
    return this.http.delete<any>(this.apiEndpoint + id + '/');
  }

  getPopularStyle(brandId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + 'popular/?brandId=' + brandId);
  }

  formatQueryParams(
    filter?: any,
    sortColumn?: string,
    sortDirection?: string,
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
      queryParams += `offset=${pageIndex * pageSize}`;
    }

    if (pageSize !== undefined) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `limit=${pageSize}`;
    }

    if (filter.sku && filter.sku.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `sku=${filter.sku}`;
    }

    if (filter.name && filter.name.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `name=${filter.name}`;
    }

    if (filter.slug && filter.slug.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `slug=${filter.slug}`;
    }

    if (filter.brand && filter.brand.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `brand=${filter.brand}`;
    }

    if (filter.collection && filter.collection.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `collection=${filter.collection}`;
    }

    if (filter.category && filter.category.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `category=${filter.category}`;
    }

    return queryParams;
  }

  getAllStyles(): Observable<Style[]> {
    return this.http.get<{ data: Style[] }>(this.apiEndpoint).pipe(
      map(response => {
        return response.data;
      })
    );
  }
}
