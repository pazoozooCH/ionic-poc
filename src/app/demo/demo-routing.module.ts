import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FormDemoComponent } from "./form-demo/form-demo.component";
import { CameraDemoComponent } from "./camera-demo/camera-demo.component";
import { ListDemoComponent } from "./list-demo/list-demo.component";
import { LocalStorageDemoComponent } from "./local-storage-demo/local-storage-demo.component";

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
    path: "storage",
    component: LocalStorageDemoComponent,
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
