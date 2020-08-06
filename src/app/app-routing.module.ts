import { AddComponent } from "./pages/add/add.component";
import { AuthGuard } from "./guards/auth.guard";
import { AppGuard } from "./guards/app.guard";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { DetailsComponent } from "./pages/details/details.component";
import { HomeComponent } from "./pages/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AppGuard],
    },
  {
    path: "details/:city",
    component: DetailsComponent,
    canActivate: [AppGuard],
  },
  { path: "add", component: AddComponent, canActivate: [AppGuard] },
  { path: "login", component: LoginComponent,  canActivate: [AuthGuard] },
  { path: "signup", component: SignupComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
