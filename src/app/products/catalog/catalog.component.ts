import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from 'src/app/interfaces/cart.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  public products: Array<Product> = [];
  public filteredProducts: Array<Product> = [];
  constructor(private afDatabase: AngularFireDatabase, private _cart: CartService, private modal: NgbModal) {
    this.getProducts();
  }

  private getProducts() {
    this.afDatabase.object(`/products`).valueChanges().subscribe({
      next: (data: any) => {
        this.products = data;
        this.filterProducts("");
      }
    });
  }

  public filterProducts(search: string) {
    this.filteredProducts = [...this.products];
    if (search) {
      const searchTerm = search.toLocaleLowerCase();
      this.filteredProducts = [...this.products].filter((product: Product) => {
        const productName = product.name.toLocaleLowerCase();
        return productName.match(searchTerm);
      });
    }
  }

  public addToCart(cartItem: Cart) {
    this._cart.addToCart(cartItem);
  }

  public openProductDetail(product: Product) {
    const reference: NgbModalRef = this.modal.open(ProductDetailComponent, { windowClass: 'product-detail' });
    const component: ProductDetailComponent = reference.componentInstance;
    component.product = product;
    reference.result.then((_product: Product) => {
      if (_product) {
        this._cart.addToCart({ product: _product, quantity: 1 })
      }
    });
  }
}