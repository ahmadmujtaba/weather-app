import { Injectable } from "@angular/core";
import {
  AngularFireLiteAuth,
  AngularFireLiteFirestore,
} from "angularfire-lite";
import { switchMap, first } from "rxjs/operators";
import { pipe } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FbService {
  constructor(
    public auth: AngularFireLiteAuth,
    public fs: AngularFireLiteFirestore
  ) {}

  isAuth() {
    return this.auth.isAuthenticated();
  }

  signIn(email: string, pass: string) {
    return this.auth.signin(email, pass);
  }

  signUp(email: string, pass: string) {
    return this.auth.signup(email, pass);
  }

  getCities() {
    return this.auth.uid().pipe(
      switchMap((uid) => {
        return this.fs.read(`${uid}`);
      })
    );
  }

  addCity(cityName: string) {
    return this.auth.uid().pipe(
      switchMap((uid) => {
        return this.fs
          .write(`${uid}/${cityName}`, { name, added: new Date() })
          .pipe(first());
      }),
      first()
    );
  }
}
