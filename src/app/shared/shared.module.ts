import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    BannerComponent,
    ProductCardComponent,
    InputSearchComponent,
    ProfileComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BannerComponent, InputSearchComponent, ProductCardComponent, ProfileComponent, CartComponent, CartItemComponent]
})
export class SharedModule { }
