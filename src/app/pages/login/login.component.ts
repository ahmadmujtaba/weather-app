import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { FbService } from "./../../services/fb.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  constructor(public fbService: FbService, public router: Router) {}

  ngOnInit() {}
  login(e: any) {
    this.fbService
      .signIn(e.target.email.value, e.target.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigateByUrl("");
        },
        (error) => {
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2000);
        }
      );
  }
}
