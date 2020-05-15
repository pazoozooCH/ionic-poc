import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";

interface ReorderingItem {
  index: number;
  position: number;
  color: string;
}

@Component({
  selector: "app-list-demo",
  templateUrl: "./list-demo.component.html",
  styleUrls: ["./list-demo.component.scss"],
})
export class ListDemoComponent {
  private static colors = [
    "primary",
    "secondary",
    "tertiary",
    "success",
    "warning",
    "danger",
  ];
  reorderingItems: ReorderingItem[] = Array.from(new Array(5)).map((_, i) => ({
    index: i,
    position: i,
    color: ListDemoComponent.colors[i % ListDemoComponent.colors.length],
  }));

  reordering = false;

  reorderingItems2 = Array.from(new Array(5)).map(
    (_, i) => ListDemoComponent.colors[i % ListDemoComponent.colors.length]
  );

  constructor(private toastController: ToastController) {}

  selected(text: string) {
    this.showToast(text);
  }

  doReorder(event: CustomEvent) {
    const detail = event.detail;
    const from: number = detail.from;
    const to: number = detail.to;

    const newOrder = [...this.reorderingItems];
    newOrder.splice(to, 0, newOrder.splice(from, 1)[0]);

    this.reorderingItems = newOrder;

    event.detail.complete();
  }

  doReorder2(event: CustomEvent) {
    event.detail.complete();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }
}
