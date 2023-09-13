import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Collection,
  CollectionResponse,
  CollectionsListResponse,
} from '../../home/models/collection.model';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  apiEndpoint = ` ${environment.apiUrl}collections/`;

  previousFilter: any = {};

  previousSortColumn = 'name';

  previousSortDirection = 'asc';

  previousPageIndex = 0;

  previousPageSize = 10;

  public collectionsList = new BehaviorSubject<CollectionsListResponse>({
    dataCount: 0,
    data: [],
  });

  constructor(private http: HttpClient) {}

  //
  // Begin functions that most services have.
  //

  getCollections(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<CollectionsListResponse> {
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

    return this.http.get<CollectionsListResponse>(
      this.apiEndpoint + queryParams
    );
  }

  //
  // Call this function to repeat the previous query, after deleting
  // a brand for example.
  //

  reloadCollections(): Observable<CollectionsListResponse> {
    return this.getCollections(
      this.previousFilter,
      this.previousSortColumn,
      this.previousSortDirection,
      this.previousPageIndex,
      this.previousPageSize
    );
  }

  postCollection(data: Collection): Observable<Collection> {
    return this.http.post<Collection>(this.apiEndpoint, JSON.stringify(data));
  }

  getCollection(id: string): Observable<CollectionResponse> {
    return this.http.get<CollectionResponse>(this.apiEndpoint + id + '/');
  }

  postCollectionLinkedShops(
    id: string,
    data: Array<string>
  ): Observable<Collection> {
    return this.http.post<Collection>(
      this.apiEndpoint + id + '/shops/',
      JSON.stringify(data)
    );
  }

  getCollectionLinkedShops(id: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + id + '/shops/');
  }

  postCollectionLinkedOffers(
    id: string,
    data: Array<string>
  ): Observable<Collection> {
    return this.http.post<Collection>(
      this.apiEndpoint + id + '/offers/',
      JSON.stringify(data)
    );
  }

  getCollectionLinkedOffers(id: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + id + '/offers/');
  }

  putCollection(data: Collection): Observable<Collection> {
    return this.http.put<Collection>(
      this.apiEndpoint + data.id + '/',
      JSON.stringify(data)
    );
  }

  deleteCollection(id: string): Observable<any> {
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

    return queryParams;
  }

  //
  // End functions that most services have.
  //

  //
  // Begin special functions specific to only this service.
  //

  getAllCollections(): Observable<Collection[]> {
    return this.http.get<{ data: Collection[] }>(this.apiEndpoint).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  //
  // End special functions specific to only this service.
  //
}
