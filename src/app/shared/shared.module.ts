import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BannerComponent,
    ProductCardComponent,
    InputSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BannerComponent, InputSearchComponent, ProductCardComponent]
})
export class SharedModule { }
