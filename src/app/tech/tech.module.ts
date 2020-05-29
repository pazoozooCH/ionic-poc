import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";
import { IonicModule } from "@ionic/angular";
import { TechRoutingModule } from "./tech-routing.module";

@NgModule({
  declarations: [AuthenticationDemoComponent],
  imports: [CommonModule, TechRoutingModule, IonicModule],
})
export class TechModule {}
