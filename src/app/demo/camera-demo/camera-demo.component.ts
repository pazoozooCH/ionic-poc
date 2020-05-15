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
  photo: SafeResourceUrl;
  showInfo = true;

  constructor(
    private sanitizer: DomSanitizer,
    private toastController: ToastController
  ) {}

  async takePicture() {
    try {
      const image = await Plugins.Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
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
