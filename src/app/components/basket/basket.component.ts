import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts, IProductsBasket } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  constructor(private ProductService: ProductsService) { }
  basket: IProductsBasket[]
  basketSubscription: Subscription
  ngOnInit(): void {
    this.basketSubscription = this.ProductService.getProductBasket().subscribe((data) => { this.basket = data })
  }
  ngOnDestroy() {
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe()
    }
  }
  minusItemBasket(product: IProductsBasket) {
    if (product.quantity === 1) {
      this.ProductService.deleteProductToBasket(product.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === product.id)
        this.basket.splice(idx, 1)

      })
    } else {
      product.quantity -= 1
      this.ProductService.updateProductBasket(product).subscribe((data) => { })
    }
  }
  plusItemBasket(product: IProductsBasket) {
    product.quantity += 1
    this.ProductService.updateProductBasket(product).subscribe((data) => { })
  }

}
