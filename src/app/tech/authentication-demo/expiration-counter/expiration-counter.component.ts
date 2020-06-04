import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-expiration-counter",
  templateUrl: "./expiration-counter.component.html",
  styleUrls: ["./expiration-counter.component.scss"],
})
export class ExpirationCounterComponent implements OnChanges {
  Math = Math;

  @Input()
  secondsToExpiration: number;

  expired: boolean;

  ngOnChanges() {
    this.expired =
      this.secondsToExpiration !== undefined && this.secondsToExpiration < 0;
  }
}
