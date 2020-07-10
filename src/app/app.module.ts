import { WeatherCardComponent } from "./pages/weather-card/weather-card.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { AddCardComponent } from "./pages/add-card/add-card.component";
import { HttpClientModule } from "@angular/common/http";
import { DetailsComponent } from "./pages/details/details.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCardComponent,
    WeatherCardComponent,
    DetailsComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
