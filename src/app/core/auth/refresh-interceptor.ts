import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
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
      catchError((err) => {
        console.log("##error", err);
        return throwError(err);
      })
    );
  }
}
