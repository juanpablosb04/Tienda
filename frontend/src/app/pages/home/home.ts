import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { PerfumeService } from '../../services/perfume.service';
import { Perfume } from '../../models/perfume.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private perfumeService = inject(PerfumeService);

  featuredProducts: Perfume[] = [];
  newArrivals: Perfume[] = [];

  ngOnInit(): void {
    this.featuredProducts = this.perfumeService.getFeatured().slice(0, 3);
    this.newArrivals      = this.perfumeService.getNewArrivals().slice(0, 4);
  }
}