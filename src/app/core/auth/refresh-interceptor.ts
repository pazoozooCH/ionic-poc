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
    console.log("##intercepting");
    return next.handle(req).pipe(
      tap((res) => {
        console.log("##intercepted", res.type, res);
        if (
          res.type === HttpEventType.Response ||
          res.type === HttpEventType.ResponseHeader
        ) {
          const httpResponse = res as HttpResponse<any>;
          console.log("##response", res.status);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log("##catchError of interceptor");
        if (err && err.status === 401 && req.headers.has("Authorization")) {
          if (!this.refreshing$) {
            console.log("##triggering refresh");
            this.refreshing$ = from(this.authService.refresh()).pipe(
              share(),
              finalize(() => {
                console.log("#refreshing done");
                this.refreshing$ = null;
              })
            );
          } else {
            console.log("#reusing refreshing");
          }

          return this.refreshing$.pipe(
            switchMap((tokenRes) => {
              if (tokenRes.access_token) {
                console.log("##Resending request");
                const header = "Bearer " + tokenRes.access_token;
                const headers = req.headers.set("Authorization", header);
                const updatedReq = req.clone({ headers });
                return next.handle(updatedReq);
              } else {
                return throwError(err);
              }
            }),
            catchError((err) => {
              console.log("###error refreshing token", err);
              throw err; // TODO redirect to login...
            })
          );
        } else {
          return throwError(err);
        }
      })
    );
  }
}
