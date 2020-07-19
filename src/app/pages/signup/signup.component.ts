import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { FbService } from "./../../services/fb.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  errorMessage: string;
  constructor(public fbService: FbService, public router: Router) {}

  ngOnInit() {}
  signup(e: any) {
    this.fbService
      .signUp(e.target.email.value, e.target.password.value)
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
