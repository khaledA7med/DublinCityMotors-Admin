export interface Category {
  name: string;
  subcategories?: Category[];
  checked?: boolean;
}

export interface Type {
  name: string;
}

export interface Features {
  specs: string;
}

export interface Option {
  label: string;
}
