import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";
import { switchMap, tap, map, catchError } from "rxjs/operators";
import { interval, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "src/app/core/ui/notification.service";

@Component({
  selector: "app-authentication-demo",
  templateUrl: "./authentication-demo.component.html",
  styleUrls: ["./authentication-demo.component.scss"],
})
export class AuthenticationDemoComponent {
  AuthService = AuthService;

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

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  reload() {
    window.location.reload();
  }

  clearStorage() {
    localStorage.clear();
  }

  async callApi() {
    const res = await this.http
      .get<any>(
        "https://accounts.inftec.ch/auth/realms/pwa-poc/protocol/openid-connect/userinfo"
      )
      .pipe(
        map((userInfo) => "☁ API Success: " + userInfo.sub),
        catchError((e: HttpErrorResponse) =>
          of(`🌩 API Error: ${e.status} ${e.statusText}`)
        )
      )
      .toPromise();

    await this.notificationService.showSimpleNotification(res);
  }
}
