import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  public product: Product | null = null;

  constructor(private modal: NgbActiveModal) {
  }

  public closeModal() {
    this.modal.dismiss();
  }

  public addItem(product: Product | null) {
    this.modal.close(product);
  }
}
