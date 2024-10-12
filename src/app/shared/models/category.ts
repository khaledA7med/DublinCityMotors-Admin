export interface Category {
  name: string;
  subcategories?: Category[];
  checked?: boolean;
}

export interface Type {
  name: string;
}

export interface Specs {
  specs: string;
}

export interface Option {
  label: string;
}
