import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts, IProductsBasket } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://localhost:3000/products'
  urlBasket: string = 'http://localhost:3000/basket'
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProducts[]>(this.url)
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`${this.url}/${id}`)
  }

  postProduct(product: IProducts){
    
    return this.http.post<IProducts>(this.url, product)
  }
  updateProduct(product: IProducts){
    
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product)
  }
  
  deleteProduct(id:number){
    return this.http.delete<IProducts>(`${this.url}/${id}`)
  }
  postProductToBasket(product: IProductsBasket){
    
    return this.http.post<IProductsBasket>(this.urlBasket, product)
  }
  getProductBasket() {
    return this.http.get<IProductsBasket[]>(this.urlBasket)
  }
  updateProductBasket(product: IProductsBasket){
    
    return this.http.put<IProductsBasket>(`${this.urlBasket}/${product.id}`, product)
  }
  deleteProductToBasket(id:number){
    return this.http.delete<IProducts>(`${this.urlBasket}/${id}`)
  }
}
