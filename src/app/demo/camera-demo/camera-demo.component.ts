import { Component, OnInit } from "@angular/core";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ToastController } from "@ionic/angular";

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
    private sanitizer: DomSanitizer,
    private toastController: ToastController
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
        source: this.cameraSource,
      });

      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
        image && image.dataUrl
      );

      this.showInfo = false;
    } catch (error) {
      console.error(error);
      const toast = await this.toastController.create({
        duration: 2000,
        message: `Couldn't take photo: ${error}`,
      });
      await toast.present();
    }
  }
}
