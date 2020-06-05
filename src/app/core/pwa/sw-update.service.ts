import { Injectable } from "@angular/core";
import {
  SwUpdate,
  UpdateAvailableEvent,
  UpdateActivatedEvent,
} from "@angular/service-worker";
import { scan, shareReplay, startWith } from "rxjs/operators";
import { NotificationService } from "../ui/notification.service";

@Injectable({
  providedIn: "root",
})
export class SwUpdateService {
  isEnabled = this.swUpdate.isEnabled;

  availableEvents$ = this.swUpdate.available.pipe(
    scan((acc: UpdateAvailableEvent[], val) => {
      acc.push(val);
      return acc;
    }, []),
    startWith([]),
    shareReplay(1)
  );

  activatedEvents$ = this.swUpdate.activated.pipe(
    scan((acc: UpdateActivatedEvent[], val) => {
      acc.push(val);
      return acc;
    }, []),
    startWith([]),
    shareReplay(1)
  );

  constructor(
    private notificationService: NotificationService,
    private swUpdate: SwUpdate
  ) {}

  async checkForUpdate() {
    try {
      await this.swUpdate.checkForUpdate();
      await this.notificationService.showSimpleNotification("Check done");
    } catch (err) {
      await this.notificationService.showError(`Check failed: ${err}`);
    }
  }

  async activateUpdate() {
    try {
      await this.swUpdate.activateUpdate();
      await this.notificationService.showSimpleNotification(
        "Update done. Reloading."
      );
      window.location.reload();
    } catch (err) {
      await this.notificationService.showError(`Update failed: ${err}`);
    }
  }
}
