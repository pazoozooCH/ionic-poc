import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Plugins, PluginListenerHandle } from "@capacitor/core";

const { Clipboard } = Plugins;

@Component({
  selector: "app-clipboard-demo",
  templateUrl: "./clipboard-demo.component.html",
  styleUrls: ["./clipboard-demo.component.scss"],
})
export class ClipboardDemoComponent implements OnInit, OnDestroy {
  textToCopy = "";
  pastedText = "";
  permissions = "";
  events = [];

  clipboardListener: PluginListenerHandle;

  async ngOnInit() {
    const res = await Clipboard.requestPermissions();
    this.permissions = JSON.stringify(res);

    this.clipboardListener = Clipboard.addListener("copy", (ev) => {
      this.events.push(JSON.stringify(ev));
    });
  }

  ngOnDestroy() {
    if (this.clipboardListener) {
      this.clipboardListener.remove();
    }
  }

  async copy() {
    await Clipboard.write({
      string: this.textToCopy,
      label: "ionic-poc Clipboard Label",
    });
  }

  async paste() {
    const val = await Clipboard.read();
    this.pastedText = JSON.stringify(val);
  }
}
