import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthErrorEvent, OAuthService } from "angular-oauth2-oidc";
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    // Useful for debugging:
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    });

    // TODO do we need this?
    // this.oauthService.events
    //   .pipe(filter((e) => ["token_received"].includes(e.type)))
    //   .subscribe((e) => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(
        filter((e) => ["session_terminated", "session_error"].includes(e.type))
      )
      .subscribe((e) => this.navigateToLoginPage());
  }

  // These normally won't be exposed from a service like this, but
  // for debugging it makes sense.
  public get accessToken() {
    return this.oauthService.getAccessToken();
  }
  public get refreshToken() {
    return this.oauthService.getRefreshToken();
  }
  public get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }
  public get idToken() {
    return this.oauthService.getIdToken();
  }
  public get logoutUrl() {
    return this.oauthService.logoutUrl;
  }

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errorred, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$,
  ]).pipe(map((values) => values.every((b) => b)));

  static decodeToken(token): any {
    if (!token) {
      return null;
    }

    try {
      // NB: This function might have issues with Unicode.
      // See https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
      // There seems to be a decode function in the oauth-angular library we could use if this should ever be a problem...
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  private navigateToLoginPage() {
    this.router.navigateByUrl("/welcome");
  }

  public async runInitialLoginSequence(): Promise<void> {
    try {
      // 0. LOAD CONFIG:
      // First we have to check to see how the IdServer is
      // currently configured:
      await this.oauthService.loadDiscoveryDocument();

      // 1. HASH LOGIN:
      // Try to log in via hash fragment after redirect back
      // from IdServer from initImplicitFlow:
      await this.oauthService.tryLogin();

      // 2. SILENT LOGIN:
      // Try to get a new Access Token using the refresh token
      if (
        !this.oauthService.hasValidAccessToken() &&
        !!this.oauthService.getRefreshToken()
      ) {
        try {
          await this.oauthService.refreshToken();
        } catch (result) {
          // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
          // Only the ones where it's reasonably sure that sending the
          // user to the IdServer will help.
          const errorResponsesRequiringUserInteraction = [
            "interaction_required",
            "login_required",
            "account_selection_required",
            "consent_required",
          ];

          if (
            result &&
            result.reason &&
            errorResponsesRequiringUserInteraction.indexOf(
              result.reason.error
            ) >= 0
          ) {
            // 3. ASK FOR LOGIN:
            // At this point we know for sure that we have to ask the
            // user to log in, so we redirect them to the IdServer to
            // enter credentials.
            //
            // Enable this to ALWAYS force a user to login.
            // this.oauthService.initImplicitFlow();
            //
            // Instead, we'll now do this:
            console.warn(
              "User interaction is needed to log in, we will wait for the user to manually log in."
            );
          } else {
            // We can't handle the truth, just pass on the problem to the
            // next handler.
            throw result;
          }
        }
      }

      // Check for the strings 'undefined' and 'null' just to be sure. Our current
      // login(...) should never have this, but in case someone ever calls
      // initImplicitFlow(undefined | null) this could happen.
      if (
        this.oauthService.state &&
        this.oauthService.state !== "undefined" &&
        this.oauthService.state !== "null"
      ) {
        let stateUrl = this.oauthService.state;
        if (stateUrl.startsWith("/") === false) {
          stateUrl = decodeURIComponent(stateUrl);
        }
        console.warn(
          `There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`
        );
        this.router.navigateByUrl(stateUrl);
      }
    } catch (err) {
      console.error("initial login sequence failed", err);
    } finally {
      this.isDoneLoadingSubject$.next(true);
    }
  }

  public login(targetUrl?: string) {
    // Note: before version 9.1.0 of the library you needed to
    // call encodeURIComponent on the argument to the method.
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() {
    this.oauthService.logOut();
  }

  async refresh() {
    return this.oauthService.refreshToken();
  }

  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }
}
