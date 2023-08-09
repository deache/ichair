import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../state/selector/cart.selector';
import { Cart } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart$ = this.store.select(selectCartItems);
  public total: number = 0;
  constructor(private store: Store, private _cart: CartService) {
    this.cart$.subscribe({
      next: (cart: Cart[]) => {
        this.total = this.calculateTotal(cart);
        if (this.total === 0) this.closeCart();
      }
    });
  }

  public closeCart() {
    document.querySelector(".cart")?.classList.remove("opened")
  }

  private calculateTotal(cart: Cart[]): number {
    return cart.reduce((current, cartItem: Cart) => current + (cartItem.product.price * cartItem.quantity), 0);
  }

  public removeItem(cartItem: Cart) {
    this._cart.removeToCart(cartItem);
  }
}
