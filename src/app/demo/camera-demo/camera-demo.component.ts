import { Component, OnInit } from "@angular/core";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ToastController } from "@ionic/angular";
import { NotificationService } from "src/app/core/ui/notification.service";

@Component({
  selector: "app-camera-demo",
  templateUrl: "./camera-demo.component.html",
  styleUrls: ["./camera-demo.component.scss"],
})
export class CameraDemoComponent {
  CameraSource = CameraSource;

  photo: SafeResourceUrl;
  showInfo = true;

  cameraSource = CameraSource.Camera;
  quality = 100;

  constructor(
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {}

  onCameraSourceChange(event: CustomEvent) {
    this.cameraSource = event.detail.value;
  }

  onQualityChange(event: CustomEvent) {
    this.quality = event.detail.value;
  }

  async takePicture() {
    try {
      const image = await Plugins.Camera.getPhoto({
        quality: this.quality,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        // Obviously not working. See https://github.com/ionic-team/capacitor/issues/490
        source: this.cameraSource,
      });

      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
        image && image.dataUrl
      );

      this.showInfo = false;
    } catch (error) {
      console.error(error);
      await this.notificationService.showError(`Couldn't take photo: ${error}`);
    }
  }
}
