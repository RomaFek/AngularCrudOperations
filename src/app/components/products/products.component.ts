import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts, IProductsBasket } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  products: IProducts[]
  productsSubscription: Subscription
  basket: IProductsBasket[]
  basketSubscription: Subscription

  canEdit: boolean = false

  addToBasket(product: IProducts) {
    const productBasket: IProductsBasket = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      description: product.description,
      quantity: 1,
    };
    let findItem
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) this.updateToBasket(findItem)
      else this.postToBasket(productBasket)
    } else this.postToBasket(productBasket)
  }
  postToBasket(product: IProductsBasket) {
    this.ProductsService.postProductToBasket(product).subscribe((data) => this.basket.push(data))
  }
  updateToBasket(product: IProductsBasket) {
    product.quantity +=1
    this.ProductsService.updateProductBasket(product).subscribe((data) => { })
  }

  ngOnInit(): void {
    this.canEdit = true
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    })
    this.basketSubscription = this.ProductsService.getProductBasket().subscribe((data) => { this.basket = data })
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.data = product
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id)
          this.updateData(data)
        else
          this.postData(data)
      }
    }
    )
  }
  deleteItem(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(item => item.id !== id);
    })
  }

  postData(data: IProducts) {
    this.ProductsService.postProduct(data).subscribe((data) => this.products.push(data))
  }

  updateData(product: IProducts) {
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id)
          return data
        else
          return product

      })
    })

  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();

  }
}
