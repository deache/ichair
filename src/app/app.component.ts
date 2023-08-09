import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { loginSuccess } from './shared/state/actions/user.actions';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iChair - Web Store';

  constructor(private auth: AngularFireAuth, private afDatabase: AngularFireDatabase, private store: Store<User>) {
    this.auth.authState.subscribe({
      next: (result: any) => {
        if (!result) return;
        this.afDatabase.object(`/users/${result.uid}`).valueChanges().subscribe({
          next: (user: any) => this.store.dispatch(loginSuccess({ user: { ...user, uid: result.uid } }))
        });
      }
    });
  }
}
