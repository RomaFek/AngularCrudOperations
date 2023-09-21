import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: IProducts
  productsSubscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productsSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
