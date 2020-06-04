import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ToastOptions } from "@ionic/core";

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
    await this.showToast(message, { duration });
  }

  async showError(error: string) {
    await this.showToast(error, {
      color: "danger",
    });
  }

  private async showToast(message: string, options: ToastOptions = {}) {
    const defaultOptions: ToastOptions = {
      duration: NotificationDuration.Medium,
    };

    const toast = await this.toastController.create({
      message,
      ...defaultOptions,
      ...options,
    });

    await toast.present();
  }
}
