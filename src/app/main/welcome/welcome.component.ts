import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/core/auth/auth.service";
import { startWith } from "rxjs/operators";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  version = environment.build.version;
  buildTime = environment.build.buildTime;
  localBuildTime = Date.parse(environment.build.buildTime);

  loggedIn$ = this.authService.canActivateProtectedRoutes$;

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
