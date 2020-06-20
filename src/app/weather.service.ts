import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(public httpClient: HttpClient) {}

  getCityWeatherByName(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<string> {
    const citySub = new Subject<string>();
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe(
        (data) => {
          // tslint:disable-next-line: no-string-literal
          citySub.next(data["weather"]);
        },
        (error) => {
          console.log(error);
        }
      );
    return citySub;
  }

  getCitiesWeatherByName(
    cities: Array<string>,
    metric: "metric" | "imperial" = "metric"
  ): Subject<any> {
    const citiesSubject = new Subject<any>();
    cities.forEach((city) => {
      citiesSubject.next(
        this.httpClient.get(
          "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
        )
      );
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe((data) => {
        // tslint:disable-next-line: no-string-literal
        dataSubject.next(data["weather"][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSub = new Subject<number>();
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe((weather: any) => {
        dataSub.next(Math.round(Number(weather.main.temp)));
      });
    return dataSub;
  }

  getCurrentHum(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSub = new Subject<number>();
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe((weather: any) => {
        dataSub.next(Math.round(Number(weather.main.humidity)));
      });
    return dataSub;
  }

  getCurrentWind(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSub = new Subject<number>();
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe((weather: any) => {
        dataSub.next(Math.round(Number(weather.wind.speed)));
      });
    return dataSub;
  }

  getMaxTemp(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSub = new Subject<number>();
    let max: number;
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.foreach((value: any) => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSub.next(Math.round(max));
      });

    return dataSub;
  }

  getMinTemp(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSub = new Subject<number>();
    let min: number;
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.foreach((value: any) => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSub.next(Math.round(min));
      });
    return dataSub;
  }

  getForcast(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<Array<any>> {
    const dataSub = new Subject<Array<any>>();
    this.httpClient
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562"
      )
      .subscribe((weather: any) => {
        dataSub.next(weather.list);
      });
    return dataSub;
  }
}
