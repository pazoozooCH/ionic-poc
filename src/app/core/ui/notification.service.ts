import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

export enum NotificationDuration {
  Short = 1000,
  Medium = 5000,
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private static readonly DURATION_MEDIUM_MS = 5000;

  constructor(private toastController: ToastController) {}

  async showSimpleNotification(
    message: string,
    duration = NotificationDuration.Medium
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
    });

    await toast.present();
  }
}
