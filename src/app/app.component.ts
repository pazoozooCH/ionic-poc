import { Component, OnInit } from "@angular/core";

import { Platform, LoadingController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./core/auth/auth.service";
import { filter, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.authService.runInitialLoginSequence();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.showAuthenticatingOverlay();
  }

  private async showAuthenticatingOverlay() {
    const loading = await this.loadingController.create({
      message: "Authenticating...",
    });

    await loading.present();

    await this.authService.isDoneLoading$
      .pipe(
        filter((done) => done),
        take(1)
      )
      .toPromise();

    await loading.dismiss();
  }
}
