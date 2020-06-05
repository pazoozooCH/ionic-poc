import { Component, OnInit } from "@angular/core";
import {
  SwUpdate,
  UpdateAvailableEvent,
  UpdateActivatedEvent,
} from "@angular/service-worker";
import { NotificationService } from "src/app/core/ui/notification.service";
import { SwUpdateService } from "src/app/core/pwa/sw-update.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-sw-update",
  templateUrl: "./sw-update.component.html",
  styleUrls: ["./sw-update.component.scss"],
})
export class SwUpdateComponent {
  version = environment.build.version;
  buildTime = environment.build.buildTime;

  events = [
    {
      name: "updateAvailableEvents",
      events: this.swUpdateService.availableEvents$,
    },
    {
      name: "updateActivatedEvents",
      events: this.swUpdateService.activatedEvents$,
    },
  ];

  constructor(public swUpdateService: SwUpdateService) {}
}
