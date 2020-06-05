import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, from } from "rxjs";
import { tap, catchError, switchMap, share, finalize } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { DefaultOAuthInterceptor, TokenResponse } from "angular-oauth2-oidc";

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  private refreshing$: Observable<TokenResponse> = null;

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err && err.status === 401 && req.headers.has("Authorization")) {
          if (!this.refreshing$) {
            this.refreshing$ = from(this.authService.refresh()).pipe(
              share(),
              finalize(() => {
                this.refreshing$ = null;
              })
            );
          }

          return this.refreshing$.pipe(
            switchMap((tokenRes) => {
              if (tokenRes.access_token) {
                const header = "Bearer " + tokenRes.access_token;
                const headers = req.headers.set("Authorization", header);
                const updatedReq = req.clone({ headers });
                return next.handle(updatedReq);
              } else {
                return throwError(err);
              }
            }),
            catchError((refreshError) => {
              console.error("refreshing token", refreshError);
              // TODO Consider redirect to login...
              throw err;
            })
          );
        } else {
          return throwError(err);
        }
      })
    );
  }
}
