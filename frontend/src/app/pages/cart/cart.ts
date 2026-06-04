import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
})
export class CartComponent {
  cartService = inject(CartService);

  updateQty(perfumeId: number, sizeValue: number, delta: number, currentQty: number): void {
    this.cartService.updateQuantity(perfumeId, sizeValue, currentQty + delta);
  }

  remove(perfumeId: number, sizeValue: number): void {
    this.cartService.removeItem(perfumeId, sizeValue);
  }
}