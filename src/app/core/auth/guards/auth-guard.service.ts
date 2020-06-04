import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { NotificationService } from "../../ui/notification.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.canActivateProtectedRoutes$.pipe(
      tap((canActivate) => {
        if (canActivate) {
          this.notificationService.showSimpleNotification(
            `Navigation to ${state.url} was granted`
          );
        } else {
          this.notificationService.showError(
            `Navigation to ${state.url} was blocked`
          );
        }
      })
    );
  }
}
