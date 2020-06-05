import { Component, OnInit } from "@angular/core";
import { Plugins, DeviceInfo, DeviceBatteryInfo } from "@capacitor/core";

const { Device } = Plugins;

@Component({
  selector: "app-device-demo",
  templateUrl: "./device-demo.component.html",
  styleUrls: ["./device-demo.component.scss"],
})
export class DeviceDemoComponent implements OnInit {
  info: DeviceInfo;
  batteryInfo: DeviceBatteryInfo;

  constructor() {}

  async ngOnInit() {
    this.info = await Device.getInfo();
    this.batteryInfo = await Device.getBatteryInfo();
  }
}
