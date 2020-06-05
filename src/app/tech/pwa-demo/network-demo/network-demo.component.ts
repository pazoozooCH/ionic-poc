import { Component, OnInit, OnDestroy } from "@angular/core";
import { Plugins, NetworkStatus, PluginListenerHandle } from "@capacitor/core";

const { Network } = Plugins;

@Component({
  selector: "app-network-demo",
  templateUrl: "./network-demo.component.html",
  styleUrls: ["./network-demo.component.scss"],
})
export class NetworkDemoComponent implements OnInit, OnDestroy {
  status: NetworkStatus;
  changes: NetworkStatus[] = [];

  private networkListener: PluginListenerHandle;

  constructor() {}

  async ngOnInit() {
    this.status = await Network.getStatus();

    Network.addListener("networkStatusChange", (status) => {
      this.status = status;
      this.changes.push(status);
    });
  }

  ngOnDestroy() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }
}
