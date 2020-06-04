import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";
import { IonicModule } from "@ionic/angular";
import { TechRoutingModule } from "./tech-routing.module";
import { ExpirationCounterComponent } from "./authentication-demo/expiration-counter/expiration-counter.component";
import { SecuredPageComponent } from "./authentication-demo/secured-page/secured-page.component";

@NgModule({
  declarations: [
    AuthenticationDemoComponent,
    ExpirationCounterComponent,
    SecuredPageComponent,
  ],
  imports: [CommonModule, TechRoutingModule, IonicModule],
})
export class TechModule {}
