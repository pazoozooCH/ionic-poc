import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoRoutingModule } from "./demo-routing.module";
import { FormDemoComponent } from "./form-demo/form-demo.component";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { CameraDemoComponent } from "./camera-demo/camera-demo.component";
import { ListDemoComponent } from "./list-demo/list-demo.component";
import { LocalStorageDemoComponent } from "./local-storage-demo/local-storage-demo.component";
import { DetailModalComponent } from "./local-storage-demo/detail-modal/detail-modal.component";

@NgModule({
  declarations: [
    CameraDemoComponent,
    DetailModalComponent,
    FormDemoComponent,
    ListDemoComponent,
    LocalStorageDemoComponent,
  ],
  imports: [CommonModule, DemoRoutingModule, IonicModule, ReactiveFormsModule],
})
export class DemoModule {}
