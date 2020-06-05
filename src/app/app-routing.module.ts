import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./main/welcome/welcome.component";

const routes: Routes = [
  {
    path: "welcome",
    component: WelcomeComponent,
  },
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
    redirectTo: "welcome",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
