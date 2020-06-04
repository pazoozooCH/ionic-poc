import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-secured-page",
  templateUrl: "./secured-page.component.html",
  styleUrls: ["./secured-page.component.scss"],
})
export class SecuredPageComponent implements OnInit {
  type: string;
  id: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.type = this.route.snapshot.data.type;
  }
}
