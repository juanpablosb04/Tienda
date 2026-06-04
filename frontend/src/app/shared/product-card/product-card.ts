import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Perfume } from '../../models/perfume.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Perfume;

  // 'home'    → imagen grande, nombre, notas, precio al costado
  // 'catalog' → imagen 4/5, marca arriba, nombre italic on hover, precio abajo
  @Input() variant: 'home' | 'catalog' = 'home';

  // 'large' solo aplica en variant home (producto destacado)
  @Input() size: 'default' | 'large' = 'default';
}