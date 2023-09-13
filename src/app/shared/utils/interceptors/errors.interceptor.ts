import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError(e => this.handleError(e))
    );
  }

  handleError(e: HttpErrorResponse): Observable<any> {
    if (e.error instanceof ErrorEvent) {
      console.error(`Client error: ${e.error.message || 'Unknown'}.`);
    } else {
      console.error('Web server error.');
      if (e.error) {
        if (e.status !== 200) {
          console.error(
            `Description: \n
              status: [${e.status}] \n
              body: [${e.error.message || 'Unknown'}]`
          );
        }
      }
    }

    return throwError(e);
  }
}
