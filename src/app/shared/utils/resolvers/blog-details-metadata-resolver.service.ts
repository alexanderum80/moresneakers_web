import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { UrlMetaData } from '../../classes/urlMetaData';

@Injectable({
  providedIn: 'root',
})
export class BlogDetailsMetadataResolver implements Resolve<UrlMetaData> {
  constructor(private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UrlMetaData> | Promise<UrlMetaData> | UrlMetaData {
    return of({
      title: 'MyTitle',
      description: 'My Description',
      keywords: 'x y z',
    });
  }
}
