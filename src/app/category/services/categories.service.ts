import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  CategoriesListResponse,
  CategoriesResponse,
  Category,
} from '../../home/models/category.model';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiEndpoint = `${environment.apiUrl}categories/`;

  public categoriesList = new BehaviorSubject<CategoriesListResponse>({
    dataCount: 0,
    data: [],
  });

  constructor(private http: HttpClient) {}

  //
  // Begin functions that most services have.
  //

  getCategories(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<CategoriesListResponse> {
    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex,
      pageSize
    );

    return this.http.get<CategoriesListResponse>(
      this.apiEndpoint + queryParams
    );
  }

  postCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(this.apiEndpoint, JSON.stringify(data));
  }

  getCategory(id: string): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(this.apiEndpoint + id + '/');
  }

  putCategory(data: Category): Observable<Category> {
    return this.http.put<Category>(
      this.apiEndpoint + data.id + '/',
      JSON.stringify(data)
    );
  }

  deleteCategory(id: string): Observable<any> {
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

    return queryParams;
  }

  //
  // End functions that most services have.
  //

  //
  // Begin special functions specific to only this service.
  //

  getAllCategories(): Observable<Category[]> {
    const queryParams = {
      ordering: 'name',
    };

    return this.http
      .get<{ data: Category[] }>(this.apiEndpoint, { params: queryParams })
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  //
  // End special functions specific to only this service.
  //
}
