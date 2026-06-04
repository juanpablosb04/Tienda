import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Perfume, SizeOption } from '../../models/perfume.model';
import { PerfumeService } from '../../services/perfume.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfume-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './perfume-detail.html',
  styleUrl: './perfume-detail.css',
})
export class PerfumeDetailComponent implements OnInit {

  // inject() es la forma moderna de inyectar dependencias en Angular
  private route          = inject(ActivatedRoute);
  private perfumeService = inject(PerfumeService);
  private cartService = inject(CartService);
  private router      = inject(Router);

  // Estado del componente con signals
  perfume   = signal<Perfume | null>(null);
  notFound  = signal(false);
  selectedSize = signal<SizeOption | null>(null);
  addedToBag   = signal(false);

  // Precio dinámico según el tamaño seleccionado
  currentPrice = computed(() => {
    const size = this.selectedSize();
    return size ? size.price : (this.perfume()?.price ?? 0);
  });

  ngOnInit(): void {
    // ActivatedRoute da acceso a los parámetros de la URL
    // En app.routes.ts definiste: path: 'perfumes/:id'
    // Aquí extraes ese :id
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (isNaN(id)) {
      this.notFound.set(true);
      return;
    }

    const perfume = this.perfumeService.getById(id);

    if (!perfume) {
      this.notFound.set(true);
      return;
    }

    this.perfume.set(perfume);

    // Seleccionar el primer tamaño por defecto
    if (perfume.sizes && perfume.sizes.length > 0) {
      this.selectedSize.set(perfume.sizes[0]);
    }
  }

  selectSize(size: SizeOption): void {
    this.selectedSize.set(size);
  }

  addToBag(): void {
  const p    = this.perfume();
  const size = this.selectedSize();

  if (!p || !size) return;

  this.cartService.addItem(p, size, 1);
  this.addedToBag.set(true);
  setTimeout(() => this.addedToBag.set(false), 2000);
  }
}