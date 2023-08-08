import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iChair - Web Store';

  constructor(private auth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.auth.authState.subscribe({
      next: (result: any) => {
        this.afDatabase.object(`/users/${result.uid}`).valueChanges().subscribe({
          next: (data) => console.log(data)
        });
      }
    });
  }
}
