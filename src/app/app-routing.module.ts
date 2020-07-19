import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { DetailsComponent } from "./pages/details/details.component";
import { HomeComponent } from "./pages/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddCardComponent } from "./ui/add-card/add-card.component";

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
