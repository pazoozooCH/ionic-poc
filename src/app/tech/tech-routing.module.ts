import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";
import { SecuredPageComponent } from "./authentication-demo/secured-page/secured-page.component";
import { AuthGuard } from "../core/auth/guards/auth-guard.service";
import { AuthGuardWithForcedLogin } from "../core/auth/guards/auth-guard-with-forced-login.service";
import { PwaDemoComponent } from "./pwa-demo/pwa-demo.component";

const routes: Routes = [
  {
    path: "authentication",
    component: AuthenticationDemoComponent,
  },
  {
    path: "authentication/secured/:id",
    component: SecuredPageComponent,
    canActivate: [AuthGuard],
    data: {
      type: "Blocking",
    },
  },
  {
    path: "authentication/securedWithLogin/:id",
    component: SecuredPageComponent,
    canActivate: [AuthGuardWithForcedLogin],
    data: {
      type: "With Login",
    },
  },
  {
    path: "pwa",
    component: PwaDemoComponent,
  },
  {
    path: "",
    redirectTo: "authentication",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechRoutingModule {}
