import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const ASCENDING = 'asc';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  apiEndpoint = `${environment.apiUrl}layouts/`;

  constructor(private http: HttpClient) {}

  getLayout(pageId: string, layoutPage: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/' + layoutPage);
  }

  getSliders(pageId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/slider');
  }

  getHeader(pageId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/header');
  }

  getHottest(pageId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/hottest');
  }

  getMenu(pageId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/menu');
  }

  getDeals(pageId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/deals');
  }

  getReleaseText(pageId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/releases-text');
  }

  getReleaseText2(pageId: string): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + pageId + '/releases-text-2');
  }
}
