import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { DetailsComponent } from "./details/details.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddCardComponent } from "./add-card/add-card.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "details/:city", component: DetailsComponent },
  { path: "add", component: AddCardComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
