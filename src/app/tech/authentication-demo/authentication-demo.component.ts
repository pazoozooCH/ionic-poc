import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";
import { switchMap, tap, map, catchError, startWith } from "rxjs/operators";
import { interval, of, Observable, forkJoin } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "src/app/core/ui/notification.service";
import { environment } from "src/environments/environment";
import { DeviceService } from "src/app/core/pwa/device.service";

@Component({
  selector: "app-authentication-demo",
  templateUrl: "./authentication-demo.component.html",
  styleUrls: ["./authentication-demo.component.scss"],
})
export class AuthenticationDemoComponent {
  AuthService = AuthService;

  securedLinks = Array.from(new Array(5)).map((_, i) => i);

  claimTimes = [
    { key: "iat", desc: "issued at" },
    { key: "nbf", desc: "not before" },
    { key: "exp", desc: "expiration time" },
  ];

  claimTokens = ["refreshToken", "accessToken", "idToken"];

  secondsToExpiration$ = this.authService.isAuthenticated$.pipe(
    switchMap(() => interval(1000)),
    map(() => {
      const claims: any = this.authService.identityClaims;
      return claims && claims.exp
        ? Math.round(claims.exp - new Date().getTime() / 1000)
        : 0;
    })
  );

  isOnline$ = this.deviceService.isOnline$;

  constructor(
    public authService: AuthService,
    private deviceService: DeviceService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  reload() {
    window.location.reload();
  }

  clearStorage() {
    localStorage.clear();
  }

  async callApi(times = 1) {
    const reqs = Array.from(new Array(times)).map((i) =>
      this.getSecuredText$()
    );

    const res = await forkJoin(reqs)
      .pipe(
        map((texts: string[]) => ({
          text: `☁ API Success (${texts.length} requests). First: ${texts[0]}`,
          success: true,
        })),
        catchError((e: HttpErrorResponse) =>
          of({
            text: `🌩 API Error: ${e.status} ${e.statusText}`,
            success: false,
          })
        )
      )
      .toPromise();

    if (res.success) {
      await this.notificationService.showSimpleNotification(res.text);
    } else {
      await this.notificationService.showError(res.text);
    }
  }

  private getSecuredText$(): Observable<string> {
    return this.http.get(`${environment.astHost}/api/testing/secured`, {
      responseType: "text",
    });
  }
}
