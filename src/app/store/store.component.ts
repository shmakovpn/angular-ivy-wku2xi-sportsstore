import { Component } from "@angular/core";
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/products.model";

@Component({
  selector: 'store',
  templateUrl: 'store.component.html'
})
export class StoreComponent {
  public selectedCategory: string = null;
  public productsPerPage: number = 4;
  public selectedPage: number = 1;

  constructor(private repository: ProductRepository) { }

  get products(): Product[] {
    const pageIndex = (this.selectedPage - 1)*this.productsPerPage
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage)
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string): void {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number): void {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number|string): void {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(
        this.repository.getProducts(this.selectedCategory).length / this.productsPerPage
      )).fill(0).map((x, i) => i+1);
  }
}