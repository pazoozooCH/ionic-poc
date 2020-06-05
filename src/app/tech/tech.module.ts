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
import { NetworkDemoComponent } from "./pwa-demo/network-demo/network-demo.component";
import { SwUpdateComponent } from "./pwa-demo/sw-update/sw-update.component";

@NgModule({
  declarations: [
    AuthenticationDemoComponent,
    ClipboardDemoComponent,
    DeviceDemoComponent,
    ExpirationCounterComponent,
    NetworkDemoComponent,
    PwaDemoComponent,
    SecuredPageComponent,
    SwUpdateComponent,
  ],
  imports: [CommonModule, TechRoutingModule, IonicModule, FormsModule],
})
export class TechModule {}
