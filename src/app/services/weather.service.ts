import { environment } from "../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { first, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(public httpClient: HttpClient) {}
  private readonly baseUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=";
  private readonly forcastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=";

  private readonly appId = environment.appID;

  getWeather(city: string, metric: "metric" | "imperial" = "metric") {
    return this.httpClient
      .get(`${this.baseUrl}${city}&units=${metric}&APPID=${this.appId}`)
      .pipe(first());
  }

  getForcast(city: string, metric: "metric" | "imperial" = "metric") {
    return this.httpClient
      .get(`${this.forcastUrl}${city}&units=${metric}&APPID=${this.appId}`)
      .pipe(
        first(),
        map((weather) => weather[`list`])
      );
  }

  // Subscribe to get values
  // squareOdd.subscribe(x => console.log(x));
}
