import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/interfaces/cart.interface';
import { User } from 'src/app/interfaces/user.interface';
import { selectCartItems } from 'src/app/shared/state/selector/cart.selector';
import { selectCurrentUser } from 'src/app/shared/state/selector/user.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser$ = this.store.select(selectCurrentUser);
  cart$ = this.store.select(selectCartItems);
  cart: Array<Cart> = [];

  constructor(private store: Store) {
    this.cart$.subscribe({
      next: (cart: Cart[]) => this.cart = cart
    });
  }

  public openProfile() {
    document.querySelector(".profile")?.classList.add("opened")
  }

  public openCart() {
    if (!this.cart.length) return;
    document.querySelector(".cart")?.classList.add("opened")
  }
}
