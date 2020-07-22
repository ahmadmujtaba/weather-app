import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { FbService } from "./services/fb.service";
import { UiService } from "./services/ui.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  showMenu = false;
  darkModeActive: boolean;
  userEmail = "";
  constructor(
    public uiService: UiService,
    public fbService: FbService,
    public router: Router
  ) {}

  loggedIn = this.fbService.isAuth();
  sub1: Subscription;

  ngOnInit() {
    this.sub1 = this.uiService.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.fbService.auth.userData().subscribe((user) => {
      this.userEmail = user.email;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  modeToggleSwitch() {
    this.uiService.darkModeState.next(!this.darkModeActive);
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl("/login");
    this.fbService.auth.signout();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
