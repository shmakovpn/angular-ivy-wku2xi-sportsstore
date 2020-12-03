import { Injectable } from "@angular/core";
//@ts-ignore
import { Product } from "./product.model";

export class CartLine {
  constructor(public product: Product,
    public quantity: number) {} // page 139
  
  get lineTotal(): number {
    return this.quantity * this.product.price;
  }
}

@Injectable()
export class Cart {
  public lines: CartLine[] = [];
  public itemCount: number = 0; // total number of items that have been selected
  public cartPrice: number = 0; // total cost of items that have been selected

  protected recalculate(): void {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(line => {
      this.itemCount += line.quantity;
      this.cartPrice += (line.quantity * line.product.price);
    })
  }

  addLine(product: Product, quantity: number = 1): void {
    const line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity));
    }
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number): void {
    const line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  removeLine(id: number) {
    const index = this.lines.findIndex(line => line.product.id == id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }
}