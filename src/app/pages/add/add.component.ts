import { Subscription } from "rxjs";
import { FbService } from "./../../services/fb.service";
import { first } from "rxjs/operators";
import { WeatherService } from "./../../services/weather.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit, OnDestroy {
  constructor(
    public httpClinet: HttpClient,
    public weatherService: WeatherService,
    public fbService: FbService
  ) {}

  temp: number;
  city = "Rome";
  state: string;
  capitals = [];
  selectedCity;
  cardCity;
  showNote = false;
  followedCM = false;
  sub1: Subscription;
  ngOnInit() {
    this.weatherService
      .getWeather(this.city)
      .pipe(first())
      .subscribe((payload: any) => {
        this.state = payload.weather[0].main;
        this.temp = Math.ceil(Number(payload.main.temp));
      });

    this.httpClinet
      .get("https://restcountries.eu/rest/v2/all")
      .pipe(first())
      .subscribe((countries: Array<any>) => {
        countries.forEach((country: any) => {
          if (country.capital.length) {
            this.capitals.push(country.capital);
          }
        });
        this.capitals.sort();
      });

    this.sub1 = this.fbService.getCities().subscribe((cities: any) => {
      Object.values(cities).forEach((city: any) => {
        if (city.name === "Rome") {
          this.followedCM = true;
        }
      });
    });
  }
  selectCity(city: string) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else {
      this.showNote = true;
    }
  }
  addCityOfTheMonth() {
    this.fbService.addCity("Rome").subscribe(() => {
      this.followedCM = true;
    });
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
