import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";

const routes: Routes = [
  {
    path: "authentication",
    component: AuthenticationDemoComponent,
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
