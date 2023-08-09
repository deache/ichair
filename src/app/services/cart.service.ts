import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addItemToCart, removeItemFromCart } from '../shared/state/actions/cart.actions';
import { Cart } from '../interfaces/cart.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private store: Store, private toastr: ToastrService) {
    const items = localStorage.getItem('cart');
    if (items) {
      const cartItems: Cart[] = JSON.parse(items);
      cartItems.forEach((cartItem: Cart) => this.store.dispatch(addItemToCart({ cartItem })))
    }
  }

  public addToCart(cartItem: Cart) {
    this.store.dispatch(addItemToCart({ cartItem }));
    this.addToLocalStorage(cartItem);
    this.toastr.success('Product added to cart successfully!');
  }

  public removeToCart(cartItem: Cart) {
    this.store.dispatch(removeItemFromCart({ sku: cartItem.product.sku }));
    this.removeToLocalStorage(cartItem.product.sku);
    this.toastr.success('Product removed from cart successfully!');
  }

  private addToLocalStorage(cartItem: Cart) {
    const items = localStorage.getItem('cart');
    const newItems = items ? [...JSON.parse(items), cartItem] : [cartItem];
    localStorage.setItem('cart', JSON.stringify(newItems));
  }

  private removeToLocalStorage(sku: string) {
    const items = localStorage.getItem('cart');
    if (!items) return;
    const cartItems: Cart[] = JSON.parse(items).filter((cart: Cart) => sku !== cart.product.sku);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}
