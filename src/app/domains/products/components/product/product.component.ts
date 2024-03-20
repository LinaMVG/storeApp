import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimesAgoPipe } from '@shared/pipes/times-ago.pipe';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimesAgoPipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required:true}) product !: Product;
  // @Input({required:true}) img: string = ''
  // @Input({required:true}) price: number = 0;
  // @Input({required:true}) title: string = ''
  //img = 'https://picsum.photos/640/640?r=' + Math.random()

  @Output() addToCart = new EventEmitter()
  addToCartHandler(){
    console.log('Click form child');
    this.addToCart.emit( this.product)
  }
}
