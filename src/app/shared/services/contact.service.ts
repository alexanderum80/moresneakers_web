import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiEndpoint = `${environment.apiUrl}mail/`;

  constructor(private http: HttpClient) {
    // this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.contact.apiEndpoint;
  }

  postSendEmail(data: any): Observable<any> {
    return this.http.post<any>(this.apiEndpoint, data);
  }
}
