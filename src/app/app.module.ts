import { WeatherCardComponent } from "./ui/weather-card/weather-card.component";
import { AddCardComponent } from "./ui/add-card/add-card.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { DetailsComponent } from "./pages/details/details.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { AddComponent } from "./pages/add/add.component";
import { ErrorComponent } from "./ui/error/error.component";
import { AngularFireLite } from "angularfire-lite";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from "@angular/service-worker";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCardComponent,
    WeatherCardComponent,
    DetailsComponent,
    LoginComponent,
    SignupComponent,
    AddComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    AngularFireLite.forRoot(environment.config),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
