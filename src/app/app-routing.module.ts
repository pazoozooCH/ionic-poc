import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "demo",
    loadChildren: () => import("./demo/demo.module").then((m) => m.DemoModule),
  },
  {
    path: "tech",
    loadChildren: () => import("./tech/tech.module").then((m) => m.TechModule),
  },
  {
    path: "**",
    redirectTo: "tech/authentication",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
