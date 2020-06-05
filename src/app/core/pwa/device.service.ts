import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

const { Network } = Plugins;

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  isOnline$ = new BehaviorSubject(false);
  isOffline$ = this.isOnline$.pipe(map((online) => !online));

  constructor() {
    Network.addListener("networkStatusChange", (status) => {
      this.isOnline$.next(status.connected);
    });
  }
}
