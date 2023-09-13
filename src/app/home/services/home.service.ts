import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/classes/apiResponse';
import { environment } from 'src/environments/environment';
import { HomeLayout } from '../models/homeLayout.model';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  getHomeLayout(): Observable<HomeLayout> {
    return this.http
      .get<ApiResponse>(`${environment.apiUrl}layouts/home/`)
      .pipe(map(response => response.data));
  }

  getSneakersSection() {
    return this.http
      .get<ApiResponse>(`${environment.apiUrl}layouts/general/sneakers-section`)
      .pipe(map(response => response.data));
  }
}
