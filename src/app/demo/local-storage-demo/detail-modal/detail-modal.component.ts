import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.scss"],
})
export class DetailModalComponent {
  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
}
