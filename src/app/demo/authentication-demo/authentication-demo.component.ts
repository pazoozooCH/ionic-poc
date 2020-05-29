import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  selector: "app-authentication-demo",
  templateUrl: "./authentication-demo.component.html",
  styleUrls: ["./authentication-demo.component.scss"],
})
export class AuthenticationDemoComponent {
  authenticationInfos = [
    {
      key: "isAuthenticated$",
      value: this.authService.isAuthenticated$,
      async: true,
    },
    { key: "hasValidToken", value: this.authService.hasValidToken() },
    {
      key: "isDoneLoading$",
      value: this.authService.isDoneLoading$,
      async: true,
    },
    {
      key: "canActivateProtectedRoutes$",
      value: this.authService.canActivateProtectedRoutes$,
      async: true,
    },
    {
      key: "identityClaims",
      value: this.authService.identityClaims,
    },
  ];
  constructor(public authService: AuthService) {}
}
