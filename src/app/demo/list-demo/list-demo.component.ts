import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-list-demo",
  templateUrl: "./list-demo.component.html",
  styleUrls: ["./list-demo.component.scss"],
})
export class ListDemoComponent {
  constructor(private toastController: ToastController) {}

  selected(text: string) {
    this.showToast(text);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }
}
