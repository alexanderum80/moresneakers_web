import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  apiEndpoint = `${environment.apiUrl}settings/`;

  constructor(private http: HttpClient) {}

  getGDPR(): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + 'gdpr/');
  }

  getPrivacyPolicy(): Observable<any> {
    return this.http.get<any>(this.apiEndpoint + 'privacy/');
  }

  getWhoWeAre() {
    return this.http.get<any>(this.apiEndpoint + 'who_are_we/');
  }

  getBecomeAPartner() {
    return this.http.get<any>(this.apiEndpoint + 'become_partner/');
  }

  getShowOffersPinned() {
    return this.http.get<any>(this.apiEndpoint + 'showOffersPinned/');
  }

  getOffersPinnedTitle() {
    return this.http.get<any>(this.apiEndpoint + 'offersPinnedTitle/');
  }

  getPopularStyles() {
    return this.http.get<any>(this.apiEndpoint + 'popularStyles/');
  }
}
