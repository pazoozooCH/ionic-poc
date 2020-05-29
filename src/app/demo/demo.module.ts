import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoRoutingModule } from "./demo-routing.module";
import { FormDemoComponent } from "./form-demo/form-demo.component";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { CameraDemoComponent } from "./camera-demo/camera-demo.component";
import { ListDemoComponent } from "./list-demo/list-demo.component";
import { AuthenticationDemoComponent } from "./authentication-demo/authentication-demo.component";

@NgModule({
  declarations: [
    AuthenticationDemoComponent,
    CameraDemoComponent,
    FormDemoComponent,
    ListDemoComponent,
  ],
  imports: [CommonModule, DemoRoutingModule, IonicModule, ReactiveFormsModule],
})
export class DemoModule {}
