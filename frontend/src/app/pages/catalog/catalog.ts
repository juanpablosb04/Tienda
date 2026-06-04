import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Perfume } from '../../models/perfume.model';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { PerfumeService } from '../../services/perfume.service';

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';
type NoteFilter = 'woody' | 'floral' | 'citrus' | 'amber' | 'musk';
type GenderFilter = 'masculine' | 'feminine' | 'unisex';

const ITEMS_PER_PAGE = 6;

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogComponent implements OnInit {
  protected Math = Math;

  private perfumeService = inject(PerfumeService);

  // ← Esta propiedad faltaba, se llena en ngOnInit
  allPerfumes: Perfume[] = [];

  selectedGenders = signal<GenderFilter[]>([]);
  selectedNotes   = signal<NoteFilter[]>([]);
  selectedBrand   = signal<string>('');
  sortBy          = signal<SortOption>('featured');
  currentPage     = signal<number>(1);

  genderOptions: { value: GenderFilter; label: string }[] = [
    { value: 'masculine', label: 'Masculine' },
    { value: 'feminine',  label: 'Feminine'  },
    { value: 'unisex',    label: 'Unisex'    },
  ];

  noteOptions: NoteFilter[] = ['woody', 'floral', 'citrus', 'amber', 'musk'];

  brandOptions: string[] = [
    'Channel',
    "L'Artisan Rare",
    'Noir & Blanc',
    'Velvet Santal',
  ];

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured',   label: 'Featured'           },
    { value: 'newest',     label: 'Newest'             },
    { value: 'price-asc',  label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  // ← ngOnInit: carga los datos del service al iniciar
  ngOnInit(): void {
    this.allPerfumes = this.perfumeService.getAll();
  }

  filteredPerfumes = computed(() => {
    let result = [...this.allPerfumes];

    if (this.selectedGenders().length > 0) {
      result = result.filter(p => this.selectedGenders().includes(p.gender));
    }

    if (this.selectedNotes().length > 0) {
      result = result.filter(p =>
        this.selectedNotes().some(note => p.notes.includes(note))
      );
    }

    if (this.selectedBrand()) {
      result = result.filter(p => p.brand === this.selectedBrand());
    }

    switch (this.sortBy()) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
      case 'featured':
        result = result.filter(p => p.isFeatured).concat(result.filter(p => !p.isFeatured));
        break;
    }

    return result;
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredPerfumes().length / ITEMS_PER_PAGE)
  );

  paginatedPerfumes = computed(() => {
    const start = (this.currentPage() - 1) * ITEMS_PER_PAGE;
    return this.filteredPerfumes().slice(start, start + ITEMS_PER_PAGE);
  });

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  toggleGender(gender: GenderFilter): void {
    const current = this.selectedGenders();
    this.selectedGenders.set(
      current.includes(gender)
        ? current.filter(g => g !== gender)
        : [...current, gender]
    );
    this.currentPage.set(1);
  }

  isGenderSelected(gender: GenderFilter): boolean {
    return this.selectedGenders().includes(gender);
  }

  toggleNote(note: NoteFilter): void {
    const current = this.selectedNotes();
    this.selectedNotes.set(
      current.includes(note)
        ? current.filter(n => n !== note)
        : [...current, note]
    );
    this.currentPage.set(1);
  }

  isNoteSelected(note: NoteFilter): boolean {
    return this.selectedNotes().includes(note);
  }

  selectBrand(brand: string): void {
    this.selectedBrand.set(this.selectedBrand() === brand ? '' : brand);
    this.currentPage.set(1);
  }

  onSortChange(value: string): void {
    this.sortBy.set(value as SortOption);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }

  clearAllFilters(): void {
    this.selectedGenders.set([]);
    this.selectedNotes.set([]);
    this.selectedBrand.set('');
    this.sortBy.set('featured');
    this.currentPage.set(1);
  }

  activeFiltersCount = computed(() =>
    this.selectedGenders().length +
    this.selectedNotes().length +
    (this.selectedBrand() ? 1 : 0)
  );
}