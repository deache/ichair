import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart.interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() cartItem: Cart | null = null
  @Output() onRemoveClicked: EventEmitter<Cart> = new EventEmitter();

  public onRemoveClick(cartItem: Cart) {
    this.onRemoveClicked.emit(cartItem);
  }
}
