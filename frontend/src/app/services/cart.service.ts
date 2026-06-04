import { Injectable, signal, computed } from '@angular/core';
import { Perfume, SizeOption } from '../models/perfume.model';

// Interface para un item dentro del carrito
export interface CartItem {
  perfume:  Perfume;
  size:     SizeOption;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  // Signal con el array de items — es el único estado del carrito
  private items = signal<CartItem[]>([]);

  // ── Valores derivados (computed) ────────────────────────────

  // Lista de items (solo lectura para los componentes)
  cartItems = computed(() => this.items());

  // Total de unidades (para el badge del navbar)
  itemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  // Subtotal
  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.size.price * item.quantity, 0)
  );

  // Shipping gratis si el subtotal supera $150
  shippingCost = computed(() => this.subtotal() >= 150 ? 0 : 15);

  // Tax estimado (8%)
  estimatedTax = computed(() =>
    parseFloat((this.subtotal() * 0.08).toFixed(2))
  );

  // Total final
  total = computed(() =>
    this.subtotal() + this.shippingCost() + this.estimatedTax()
  );

  // ── Acciones ────────────────────────────────────────────────

  addItem(perfume: Perfume, size: SizeOption, quantity = 1): void {
    const current = this.items();

    // Busca si ya existe el mismo perfume con el mismo tamaño
    const existingIndex = current.findIndex(
      item => item.perfume.id === perfume.id && item.size.value === size.value
    );

    if (existingIndex >= 0) {
      // Ya existe: suma la cantidad
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
      this.items.set(updated);
    } else {
      // No existe: agrega nuevo item
      this.items.set([...current, { perfume, size, quantity }]);
    }
  }

  removeItem(perfumeId: number, sizeValue: number): void {
    this.items.set(
      this.items().filter(
        item => !(item.perfume.id === perfumeId && item.size.value === sizeValue)
      )
    );
  }

  updateQuantity(perfumeId: number, sizeValue: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(perfumeId, sizeValue);
      return;
    }
    this.items.set(
      this.items().map(item =>
        item.perfume.id === perfumeId && item.size.value === sizeValue
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart(): void {
    this.items.set([]);
  }

  isEmpty = computed(() => this.items().length === 0);
}