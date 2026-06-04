import { Injectable } from '@angular/core';
import { Perfume } from '../models/perfume.model';

@Injectable({ providedIn: 'root' })
export class PerfumeService {

  private perfumes: Perfume[] = [
    {
      id: 1,
      name: "Channel N°5",
      brand: 'Channel',
      price: 150000,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gender: 'feminine',
      notes: ['floral', 'musk'],
      isFeatured: true,
      description: 'A golden dawn captured in a bottle. The warmth of morning light filtered through jasmine petals and white musk.',
      olfactoryNotes: { top: 'Bergamot, Pink Pepper', heart: 'Jasmine, Rose Absolute', base: 'White Musk, Sandalwood' },
      sizes: [{ label: '50ML', value: 50, price: 240 }, { label: '100ML', value: 100, price: 340 }],
    },
    {
      id: 2,
      name: 'Nocturnal Wood',
      brand: 'Velvet Santal',
      price: 195,
      image: 'assets/images/nocturnal-wood.jpg',
      gender: 'masculine',
      notes: ['woody', 'amber'],
      description: 'A nocturnal journey through ancient forests. Smoky resins and warm amber guide the way.',
      olfactoryNotes: { top: 'Cardamom, Black Pepper', heart: 'Oud, Cedarwood', base: 'Amberwood, Sandalwood, Vetiver' },
      sizes: [{ label: '50ML', value: 50, price: 195 }, { label: '100ML', value: 100, price: 280 }],
    },
    {
      id: 3,
      name: 'Hugo Boss Infinite',
      brand: 'Hugo Boss',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1638551442447-085a2d42918f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gender: 'masculine',
      notes: ['floral'],
      isFeatured: true,
      description: 'A minimalist floral meditation. Clean, airy, and eternally elegant.',
      olfactoryNotes: { top: 'Aldehydes, Lemon Zest', heart: 'Iris, White Peony', base: 'Musk, Cashmere Wood' },
      sizes: [{ label: '50ML', value: 50, price: 65000 }, { label: '100ML', value: 100, price: 75000 }],
    },
    {
      id: 4,
      name: 'Midnight Cedar',
      brand: 'Noir & Blanc',
      price: 210,
      image: 'assets/images/midnight-cedar.jpg',
      gender: 'masculine',
      notes: ['woody'],
      description: 'Deep cedarwood anchored by smoky resins. A fragrance that commands presence.',
      olfactoryNotes: { top: 'Bergamot, Grapefruit', heart: 'Cedarwood, Cypress', base: 'Amber, Leather, Oakmoss' },
      sizes: [{ label: '50ML', value: 50, price: 210 }, { label: '100ML', value: 100, price: 295 }],
    },
    {
      id: 5,
      name: 'Santal Reserve',
      brand: 'Velvet Santal',
      price: 245,
      image: 'assets/images/santal-reserve.jpg',
      gender: 'unisex',
      notes: ['woody', 'amber'],
      isFeatured: true,
      description: 'Our most coveted creation. Pure Mysore sandalwood aged to creamy perfection.',
      olfactoryNotes: { top: 'Cardamom, Nutmeg', heart: 'Sandalwood, Rose', base: 'Amber, Vanilla, Musk' },
      sizes: [{ label: '50ML', value: 50, price: 245 }, { label: '100ML', value: 100, price: 350 }],
    },
    {
      id: 6,
      name: 'Citrus Horizon',
      brand: "L'Artisan Rare",
      price: 195,
      image: 'assets/images/citrus-horizon.jpg',
      gender: 'unisex',
      notes: ['citrus'],
      isNew: true,
      description: 'Sunshine distilled. Vibrant citrus with Mediterranean herbs and a warm woody trail.',
      olfactoryNotes: { top: 'Sicilian Lemon, Bergamot', heart: 'Neroli, Basil', base: 'Cedarwood, Musk' },
      sizes: [{ label: '50ML', value: 50, price: 195 }, { label: '100ML', value: 100, price: 275 }],
    },
    {
      id: 7,
      name: 'Amber Veil',
      brand: 'Aetheria House',
      price: 225,
      image: 'assets/images/amber-veil.jpg',
      gender: 'feminine',
      notes: ['amber', 'musk'],
      description: 'A warm, enveloping amber that wraps like silk. Intimate and deeply comforting.',
      olfactoryNotes: { top: 'Saffron, Cinnamon', heart: 'Amber, Labdanum', base: 'Vanilla, Musk, Benzoin' },
      sizes: [{ label: '50ML', value: 50, price: 225 }, { label: '100ML', value: 100, price: 315 }],
    },
    {
      id: 8,
      name: 'Velvet Rose',
      brand: 'Noir & Blanc',
      price: 175,
      image: 'assets/images/velvet-rose.jpg',
      gender: 'feminine',
      notes: ['floral', 'musk'],
      isNew: true,
      description: 'A modern rose for the contemporary woman. Velvety, bold, and unforgettable.',
      olfactoryNotes: { top: 'Raspberry, Pink Pepper', heart: 'Damask Rose, Peony', base: 'Patchouli, Musk, Amber' },
      sizes: [{ label: '50ML', value: 50, price: 175 }, { label: '100ML', value: 100, price: 250 }],
    },
  ];

  getAll(): Perfume[] {
    return this.perfumes;
  }

  getById(id: number): Perfume | undefined {
    return this.perfumes.find(p => p.id === id);
  }

  getFeatured(): Perfume[] {
    return this.perfumes.filter(p => p.isFeatured);
  }

  getNewArrivals(): Perfume[] {
    return this.perfumes.filter(p => p.isNew);
  }
}