import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IProducts } from './models/products';
import { ProductsService } from './services/products.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ProductResolver implements Resolve<IProducts>{
  constructor(private ProductsService: ProductsService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    return this.ProductsService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['products'])
        return EMPTY
      })
    )

  }
};
