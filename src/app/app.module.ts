import { WeatherCardComponent } from "./weather-card/weather-card.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AddCardComponent } from "./add-card/add-card.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCardComponent,
    WeatherCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
