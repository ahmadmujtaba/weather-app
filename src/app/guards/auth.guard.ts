import { map } from "rxjs/operators";
import { FbService } from "./../services/fb.service";
import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private fb: FbService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.fb.isAuth().pipe(
      map((auth) => {
        if (!auth) {
          return true;
        } else {
          this.router.navigate(["/"]);
          return false;
        }
      })
    );
  }
}
