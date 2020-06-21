import { WeatherService } from "./../weather.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
// import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;

  today: string;

  day1Name: string;
  day1State: string;
  day1Temp: number;

  day2Name: string;
  day2State: string;
  day2Temp: number;

  day3Name: string;
  day3State: string;
  day3Temp: number;

  day4Name: string;
  day4State: string;
  day4Temp: number;

  day5Name: string;
  day5State: string;
  day5Temp: number;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;

  constructor(
    public activatedroutd: ActivatedRoute,
    public weather: WeatherService
  ) {}

  ngOnInit() {
    const todayNumberInWeek = new Date().getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.today = days[todayNumberInWeek];

    this.activatedroutd.paramMap.subscribe((rout: any) => {
      this.city = rout.params.city;

      this.sub1 = this.weather.getWeatherState(this.city).subscribe((state) => {
        this.state = state;
      });

      this.sub2 = this.weather
        .getCurrentHum(this.city)
        .subscribe((humidity) => {
          this.hum = humidity;
        });

      this.sub3 = this.weather
        .getCurrentTemp(this.city)
        .subscribe((temperature) => {
          this.temp = temperature;
        });

      this.sub4 = this.weather
        .getCurrentWind(this.city)
        .subscribe((windSpeed) => {
          this.wind = windSpeed;
        });

      this.sub5 = this.weather.getForcast(this.city).subscribe((data: any) => {
        for (const index of data) {
          const currentDay = new Date(data[index].dt_txt).getDay();

          if (
            (currentDay === todayNumberInWeek + 1 ||
              (todayNumberInWeek === 6 && currentDay === 0)) &&
            !this.day1Name
          ) {
            this.day1Name = days[currentDay];
            this.day1State = data[index].wether[0].main;
            this.day1Temp = Math.round(data[index].main.temp);
          } else if (
            !!this.day1Name &&
            !this.day2Name &&
            days[currentDay] !== this.day1Name
          ) {
            this.day2Name = days[currentDay];
            this.day2State = data[index].weather[0].main;
            this.day2Temp = Math.round(data[index].main.temp);
          } else if (
            !!this.day2Name &&
            !this.day3Name &&
            days[currentDay] !== this.day2Name
          ) {
            this.day3Name = days[currentDay];
            this.day3State = data[index].waether[0].main;
            this.day3Temp = Math.round(data[index].main.temp);
          } else if (
            !!this.day3Name &&
            !this.day4Name &&
            days[currentDay] !== this.day3Name
          ) {
            this.day4Name = days[currentDay];
            this.day4State = data[index].weather[0].main;
            this.day4Temp = Math.round(data[index].main.temp);
          } else if (
            !!this.day4Name &&
            !this.day5Name &&
            days[currentDay] !== this.day4Name
          ) {
            this.day5Name = days[currentDay];
            this.day5State = data[index].weather[0].main;
            this.day5Temp = data[index].main.temp;
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
  }
}
