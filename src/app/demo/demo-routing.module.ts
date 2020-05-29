import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FormDemoComponent } from "./form-demo/form-demo.component";
import { CameraDemoComponent } from "./camera-demo/camera-demo.component";
import { ListDemoComponent } from "./list-demo/list-demo.component";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";

const routes: Routes = [
  {
    path: "form",
    component: FormDemoComponent,
  },
  {
    path: "camera",
    component: CameraDemoComponent,
  },
  {
    path: "list",
    component: ListDemoComponent,
  },
  {
    path: "authentication",
    component: AuthenticationDemoComponent,
  },
  {
    path: "",
    redirectTo: "form",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
