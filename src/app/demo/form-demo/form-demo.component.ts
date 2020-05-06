import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastController, ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-form-demo",
  templateUrl: "./form-demo.component.html",
  styleUrls: ["./form-demo.component.scss"],
})
export class FormDemoComponent {
  demoForm = this.fb.group({
    company: [{ value: "InfTec", disabled: true }],
    firstName: ["", Validators.required],
    lastName: [""],
    address: this.fb.group({
      street1: [""],
      street2: [""],
      city: ["", Validators.pattern(/Bern/)],
      state: [""],
      zip: ["94043", Validators.maxLength(5)],
    }),
  });

  constructor(
    private actionSheetController: ActionSheetController,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {}

  async submit() {
    await this.showToast("Submitting Data (not really 😜)");
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }

  async showActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          handler: () => this.showClickInfo("Delete"),
        },
        {
          text: "Share",
          icon: "share",
          handler: () => this.showClickInfo("Share"),
        },
        {
          text: "Play (open modal)",
          icon: "play",
          handler: () => this.showClickInfo("Play"),
        },
        {
          text: "Favorite",
          icon: "heart",
          handler: () => this.showClickInfo("Favorite"),
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => this.showClickInfo("Cancel"),
        },
      ],
    });
    await actionSheet.present();
  }

  private showClickInfo(type: string) {
    this.showToast(`${type} clicked`);
  }
}
