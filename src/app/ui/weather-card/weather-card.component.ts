import { first } from "rxjs/operators";
import { FbService } from "./../../services/fb.service";
import { UiService } from "./../../services/ui.service";
import { WeatherService } from "./../../services/weather.service";

import { Subscription } from "rxjs";
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-weather-card",
  templateUrl: "./weather-card.component.html",
  styleUrls: ["./weather-card.component.css"],
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  @Input() set city(city: string) {
    this.cityName = city;
    this.weather
      .getWeather(city)
      .pipe(first())
      .subscribe(
        (payload: any) => {
          this.state = payload.weather[0].main;
          this.temp = Math.ceil(payload.main.temp);
        },
        (err) => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2000);
        }
      );

    this.weather
      .getForcast(city)
      .pipe(first())
      .subscribe(
        (payload: any) => {
          this.maxTemp = Math.round(payload[0].main.temp);
          this.minTemp = Math.round(payload[0].main.temp);
          for (const res of payload) {
            this.maxTemp =
              res.main.temp > this.maxTemp
                ? Math.round(res.main.temp)
                : this.maxTemp;

            this.minTemp =
              res.main.temp < this.minTemp
                ? Math.round(res.main.temp)
                : this.minTemp;
          }
        },
        (err) => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2000);
        }
      );
  }
  @Input() addMode: any;
  @Output() cityStored = new EventEmitter();

  darkMode: boolean;
  cityWeather: object;
  sub1: Subscription;
  state: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  errorMessage: string;
  cityName: any;
  cityAdded = false;

  constructor(
    public weather: WeatherService,
    public router: Router,
    public uiService: UiService,
    public fb: FbService
  ) {}

  ngOnInit() {
    this.sub1 = this.uiService.darkModeState.subscribe(
      (isDarkMode: boolean) => {
        this.darkMode = isDarkMode;
      }
    );
  }
  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl("/details/" + this.cityName);
    }
  }

  addcity() {
    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = null;
      this.maxTemp = null;
      this.minTemp = null;
      this.state = null;
      this.temp = null;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => (this.cityAdded = false), 2000);
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
