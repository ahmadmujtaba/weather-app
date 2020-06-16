import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.css"],
})
export class WeatherCardComponent implements OnInit {
  darkMode = false;
  condition = "clouds";
  currentTemp = 40;
  minTemp = 33;
  maxTemp = 44;
  ngOnInit() {}
  openDetails() {}
}
