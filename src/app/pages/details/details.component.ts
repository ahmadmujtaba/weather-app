import { WeatherService } from "../../services/weather.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable, forkJoin } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { filter, map, concatMap } from "rxjs/operators";
import { of } from "rxjs/index";
import { conditionallyCreateMapObjectLiteral } from "@angular/compiler/src/render3/view/util";
// import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  darkMode: boolean;
  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;
  today: string;

  tweets$: Observable<any>;
  daysForecast: object;

  cityIllustrationPath: string;
  errorMessage: string;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    public activatedroute: ActivatedRoute,
    public weather: WeatherService
  ) {}

  ngOnInit() {
    const todayNumberInWeek = new Date().getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.today = days[todayNumberInWeek];
    this.sub2 = this.activatedroute.paramMap
      .pipe(
        concatMap((rout: any) => {
          this.city = rout.params.city;
          switch (this.city.toLowerCase()) {
            case "paris":
              this.cityIllustrationPath = "../../../assets/cities/france.svg";
              break;
            case "doha":
              this.cityIllustrationPath = "../../../assets/cities/qatar.svg";
              break;
            case "rabat":
              this.cityIllustrationPath = "../../../assets/cities/rabat.svg";
              break;
            case "tunis":
              this.cityIllustrationPath = "../../assets/cities/tunis.svg";
              break;
            case "tokyo":
              this.cityIllustrationPath = "../../assets/cities/japan.svg";
              break;
            default:
              this.cityIllustrationPath = "../../assets/cities/default.svg";
          }
          return forkJoin(
            this.weather.getWeather(this.city),
            this.weather.getForcast(this.city)
          );
        })
      )
      .subscribe(
        (payload: any) => {
          this.temp = Math.ceil(Number(payload[0].main.temp));
          this.state = payload[0].weather[0].main;
          this.hum = payload[0].main.humidity;
          this.wind = Math.round(Number(payload[0].windp.speed));

          const dates = {};
          for (const res of payload[1]) {
            const date = new Date(res.dt_txt).toDateString().split(" ")[0];
            if (dates[date]) {
              dates[date].counter += 1;
              dates[date].temp = res.main.temp;
            } else {
              dates[date] = {
                counter: 1,
                temp: res.main.temp,
                state: res.weather[0].main,
              };
            }
          }
          Object.keys(dates).forEach((day) => {
            dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
          });

          delete dates[Object.keys(dates)[0]];
          this.daysForecast = dates;
        },
        (err) => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2500);
        }
      );


  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
