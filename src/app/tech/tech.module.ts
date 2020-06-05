import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";
import { IonicModule } from "@ionic/angular";
import { TechRoutingModule } from "./tech-routing.module";
import { ExpirationCounterComponent } from "./authentication-demo/expiration-counter/expiration-counter.component";
import { SecuredPageComponent } from "./authentication-demo/secured-page/secured-page.component";
import { PwaDemoComponent } from "./pwa-demo/pwa-demo.component";
import { ClipboardDemoComponent } from "./pwa-demo/clipboard-demo/clipboard-demo.component";
import { FormsModule } from "@angular/forms";
import { DeviceDemoComponent } from "./pwa-demo/device-demo/device-demo.component";

@NgModule({
  declarations: [
    AuthenticationDemoComponent,
    ClipboardDemoComponent,
    DeviceDemoComponent,
    ExpirationCounterComponent,
    PwaDemoComponent,
    SecuredPageComponent,
  ],
  imports: [CommonModule, TechRoutingModule, IonicModule, FormsModule],
})
export class TechModule {}
