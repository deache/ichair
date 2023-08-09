import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  { path: "", component: CatalogComponent },
  { path: '**', redirectTo: "" }
];


@NgModule({
  declarations: [
    CatalogComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductsModule { }
