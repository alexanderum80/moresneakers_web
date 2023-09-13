import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Blog,
  BlogsListResponse,
  BlogsResponse,
} from 'src/app/home/models/blog.model';
import { environment } from 'src/environments/environment';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  apiEndpoint = `${environment.apiUrl}blogs/`;

  previousFilter: any = {};

  previousSortColumn = 'title';

  previousSortDirection = 'asc';

  previousPageIndex = 0;

  previousPageSize = 10;

  public blogsList = new BehaviorSubject<BlogsListResponse>({
    dataCount: 0,
    data: [],
  });

  constructor(private http: HttpClient) {}

  //
  // Begin functions that most services have.
  //

  getBlogs(
    filter: any,
    sortColumn: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): Observable<BlogsListResponse> {
    this.previousFilter = filter;
    this.previousSortColumn = sortColumn;
    this.previousSortDirection = sortDirection;
    this.previousPageIndex = pageIndex;
    this.previousPageSize = pageSize;

    const queryParams = this.formatQueryParams(
      filter,
      sortColumn,
      sortDirection,
      pageIndex - 1,
      pageSize
    );

    return this.http.get<BlogsListResponse>(this.apiEndpoint + queryParams);
  }

  //
  // Call this function to repeat the previous query, after deleting
  // a Blog for example.
  //

  reloadBlogs(): Observable<BlogsListResponse> {
    return this.getBlogs(
      this.previousFilter,
      this.previousSortColumn,
      this.previousSortDirection,
      this.previousPageIndex,
      this.previousPageSize
    );
  }

  postBlog(data: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiEndpoint, JSON.stringify(data));
  }

  getBlog(id: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + id + '/');
  }

  getBlogBySlug(slug: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + 'by-slug/' + slug);
  }

  getBlogAllImages(id: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + id + '/images/');
  }

  getAllBlogs(): Observable<BlogsResponse> {
    return this.http.get<BlogsResponse>(
      this.apiEndpoint + '?ordering=-updatedAt'
    );
  }

  getLattestNewBlogs(): Observable<BlogsListResponse> {
    return this.http.get<BlogsListResponse>(
      this.apiEndpoint + '?ordering=createdAt&offset=0&limit=3'
    );
  }

  putBlog(data: Blog): Observable<Blog> {
    return this.http.put<Blog>(
      this.apiEndpoint + data.id + '/',
      JSON.stringify(data)
    );
  }

  deleteBlog(id: string): Observable<any> {
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
    if (filter.title && filter.title.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `title=${filter.title}`;
    }

    if (filter.author && filter.author.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `author=${filter.author}`;
    }

    if (filter.type && filter.type.length > 0) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `type=${filter.type}`;
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
      queryParams += `offset=${(pageIndex === -1 ? 0 : pageIndex) * pageSize}`;
    }

    if (pageSize !== undefined) {
      queryParams += queryParams.length ? '&' : '?';
      queryParams += `limit=${pageSize}`;
    }

    return queryParams;
  }
}
