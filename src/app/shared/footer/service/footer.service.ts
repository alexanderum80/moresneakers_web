import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  apiEndpoint = `${environment.apiUrl}layouts/general/footers/`;
  apiEndpointAboutUs = `${environment.apiUrl}layouts/general/footers-abaut-us`;

  constructor(private http: HttpClient) {}

  getFooterItems(): Observable<any> {
    return this.http.get<any>(this.apiEndpoint);
  }

  getFooterAboutUs(): Observable<any> {
    return this.http.get<any>(this.apiEndpointAboutUs);
  }
}
