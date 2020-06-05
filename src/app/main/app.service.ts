import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppService {
  readonly startupTime = new Date();

  constructor() {}
}
