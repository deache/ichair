import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  public products: Array<Product> = [];
  constructor(private afDatabase: AngularFireDatabase) {
    this.getProducts();
  }

  private getProducts() {
    this.afDatabase.object(`/products`).valueChanges().subscribe({
      next: (data: any) => this.products = data
    });
  }
}
