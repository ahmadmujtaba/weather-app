import { first, map } from "rxjs/operators";
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
  showHeader = false;
  darkModeActive: boolean;
  userEmail = "";
  constructor(
    public uiService: UiService,
    public fbService: FbService,
    public router: Router
  ) {}

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  ngOnInit() {
    this.sub1 = this.uiService.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.sub2 = this.fbService.auth.userData().subscribe((user) => {
      this.userEmail = user.email;
    });
    this.sub3 = this.fbService.isAuth().subscribe((isloggin: any) => {
      this.showHeader = isloggin;
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
    this.fbService.auth.signout();
    this.showHeader = false;
    this.router.navigateByUrl("/login");
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
