import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart.interface';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product | undefined = undefined;
  @Output() onProductClick: EventEmitter<Product> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<Cart> = new EventEmitter();

  public productClicked(product: Product) {
    this.onProductClick.emit(product);
  }

  public addToCartClicked(product: Product, quantity: number) {
    this.onAddToCart.emit({ product, quantity })
  }
}

