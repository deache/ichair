import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../shared/state/actions/user.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: AngularFireAuth, private afDatabase: AngularFireDatabase, private store: Store<User>) { }

  public createUser(email: string, password: string, user: User): Observable<void> {
    return new Observable((observer) => {
      this.auth.createUserWithEmailAndPassword(email, password).then((userCredential: any) => {
        const uid = userCredential.user?.uid;
        this.afDatabase.object(`/users/${uid}`).set(user).then((response) => {
          console.log('response after create a user', response);
          observer.next(userCredential.user);
        });
      })
    });
  }

  public updateUser(body: User): Observable<void> {
    return new Observable((observer) => {
      const user = this.afDatabase.object(`/users/${body.uid}`);
      user.update(body).then(() => observer.next()).catch(() => observer.error());
    });
  }

  public login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const uid = userCredential.user?.uid;
          this.afDatabase.object(`/users/${uid}`).valueChanges().subscribe({
            next: (user) => {
              observer.next(user);
              //this.store.dispatch(loginSuccess({ user }));
            }
          });
        }).catch(() => {
          observer.error();
        });
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.store.dispatch(logout());
    });
  }
}
