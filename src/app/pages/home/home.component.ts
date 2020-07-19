import { FbService } from "./../../services/fb.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  cities;
  constructor(public fbService: FbService) {}

  ngOnInit() {
    this.cities = this.fbService.getCities();
  }
}
