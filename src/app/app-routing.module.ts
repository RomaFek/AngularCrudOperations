import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductResolver } from './product.resolver';

const routes: Routes = [
  {path:'', component: BaseComponent},
  {path:'basket', component: BasketComponent},
  {path:'product/:id', component: ProductDetailsComponent, resolve: {data: ProductResolver}},
  {path:'products', component: ProductsComponent},

  {path:'**', redirectTo:'', component: BaseComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
