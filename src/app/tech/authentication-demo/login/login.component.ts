import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";
import { of, combineLatest } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginStatus: string;

  loginDisabled = true;
  logoutDisabled$ = this.authService.canActivateProtectedRoutes$.pipe(
    map((canActivate) => !canActivate),
    startWith(true)
  );

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.initLogin();
  }

  async initLogin() {
    try {
      this.loginStatus = "Running Initial Login Sequence";
      await this.authService.runInitialLoginSequence();
      this.loginStatus = "Initial Login Sequence done";
    } catch (e) {
      this.loginStatus = `Error during initial Login Sequence: ${e}`;
    } finally {
      this.loginDisabled = false;
    }
  }
}
