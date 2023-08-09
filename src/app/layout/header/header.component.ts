import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/shared/state/selector/user.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {
  }

  public openProfile() {
    document.querySelector(".profile")?.classList.add("opened")
  }
}
