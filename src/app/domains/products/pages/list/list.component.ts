import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component';
import { Category, Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent,HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  // cart = signal<Product[]>([]);
  private cartService =inject(CartService);
  private productService = inject(ProductService)
  private categoryService = inject(CategoryService)
  @Input() category_id ?: string

  ngOnInit(){
    this.getCategories()
  }

  ngOnChanges(changes: SimpleChanges){
    this.getProducts()
  }

  // constructor() {
  //   const initProducts: Product[] = [
  //     { id: Date.now(), title: 'prod 1', price: 100, image: 'https://picsum.photos/640/640?r=23', creationAt: new Date().toISOString() },
  //     { id: Date.now(), title: 'prod 2', price: 100, image: 'https://picsum.photos/640/640?r=24', creationAt: new Date().toISOString() },
  //     { id: Date.now(), title: 'prod 3', price: 100, image: 'https://picsum.photos/640/640?r=25', creationAt: new Date().toISOString() },
  //     { id: Date.now(), title: 'prod 4', price: 100, image: 'https://picsum.photos/640/640?r=26', creationAt: new Date().toISOString() },
  //     { id: Date.now(), title: 'prod 5', price: 100, image: 'https://picsum.photos/640/640?r=27', creationAt: new Date().toISOString() },
  //     { id: Date.now(), title: 'prod 6', price: 100, image: 'https://picsum.photos/640/640?r=28', creationAt: new Date().toISOString() },
  //   ];
  //   this.products.set(initProducts)
  // }

  addToCart(product: Product) {
    console.log('Estamos en el padre');
    this.cartService.addToCart(product)
    // this.cart.update(prevState => [...prevState, product])
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products)=>{
        this.products.set(products);
      },
      error:()=>{}
    })
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (data)=>{
        this.categories.set(data);
      },
      error:()=>{}
    })
  }
}
