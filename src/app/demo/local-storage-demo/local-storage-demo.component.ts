import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { DetailModalComponent } from "./detail-modal/detail-modal.component";

interface Item {
  name: string;
  state: number;
}

@Component({
  selector: "app-local-storage-demo",
  templateUrl: "./local-storage-demo.component.html",
  styleUrls: ["./local-storage-demo.component.scss"],
})
export class LocalStorageDemoComponent implements OnInit {
  static readonly ITEMS_STORAGE_KEY = "ionic-poc-items";

  items: Item[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    const storedItems = localStorage.getItem(
      LocalStorageDemoComponent.ITEMS_STORAGE_KEY
    );

    if (storedItems) {
      this.items = JSON.parse(storedItems);
    } else {
      this.items = this.createInitialItems();
    }
  }

  private createInitialItems(): Item[] {
    return Array.from(new Array(50)).map((_, i) => ({
      name: `Some random status ${i}`,
      state: 0,
    }));
  }

  setState(item: Item, state: number) {
    item.state = state;
    this.storeItems();
  }

  private storeItems() {
    localStorage.setItem(
      LocalStorageDemoComponent.ITEMS_STORAGE_KEY,
      JSON.stringify(this.items)
    );
  }

  getColor(item: Item) {
    switch (item.state) {
      case 1:
        return "success";
      case 2:
        return "secondary";
      default:
        return "";
    }
  }

  getIcon(item: Item) {
    switch (item.state) {
      case 1:
        return "checkbox";
      case 2:
        return "close";
      default:
        return "";
    }
  }

  async selectState(item: Item) {
    const modal = await this.modalController.create({
      component: DetailModalComponent,
    });
    await modal.present();
  }
}
