import { Injectable } from "@angular/core";
import { Product } from "./product.model"

export class CartLine {
  constructor(public product: Product,
    public quantity: number) {} // page 139
  
  get lineTotal() {
    return this.quantity * this.product.price;
  }
}

@Injectable()
export class Cart {
  public lines: CartLine
}