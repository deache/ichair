import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';

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
          observer.next(response);
        });
      })
    });
  }

  public login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const uid = userCredential.user?.uid;
          this.afDatabase.object(`/users/${uid}`).valueChanges().subscribe({
            next: (user) => observer.next(user)
          });
        })
    });
  }
}
