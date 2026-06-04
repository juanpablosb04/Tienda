export interface OlfactoryNotes {
  top:   string;   // ej: "Persian Saffron, Pink Pepper"
  heart: string;   // ej: "Bulgarian Rose, Black Leather"
  base:  string;   // ej: "Amberwood, Vanilla Bean, Patchouli"
}

export interface SizeOption {
  label: string;   // "50ML"
  value: number;   // 50  (usado para lógica futura)
  price: number;   // precio puede variar por tamaño
}

export interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;               // precio base (tamaño por defecto)
  image: string;
  gender: 'masculine' | 'feminine' | 'unisex';
  notes: string[];             // ['woody', 'floral'] — para filtros

  // Campos opcionales (solo se usan en el detalle)
  description?: string;        // párrafo poético
  olfactoryNotes?: OlfactoryNotes;
  sizes?: SizeOption[];
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
}