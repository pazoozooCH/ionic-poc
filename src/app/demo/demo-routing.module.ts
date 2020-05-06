import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FormDemoComponent } from "./form-demo/form-demo.component";

const routes: Routes = [
  {
    path: "form",
    component: FormDemoComponent,
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
