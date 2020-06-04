import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";
import { IonicModule } from "@ionic/angular";
import { TechRoutingModule } from "./tech-routing.module";
import { ExpirationCounterComponent } from "./authentication-demo/expiration-counter/expiration-counter.component";

@NgModule({
  declarations: [AuthenticationDemoComponent, ExpirationCounterComponent],
  imports: [CommonModule, TechRoutingModule, IonicModule],
})
export class TechModule {}
