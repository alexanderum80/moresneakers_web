import { Brand } from 'src/app/brand/models/brand';

export interface Style {
  brand: string;

  brandId?: string;

  category: string;

  categories: string[];

  createRelease?: boolean;

  createdAt?: string;

  description: string;

  id?: string;

  isParent?: boolean;

  linkedShops?: Array<string>;

  name: string;

  parent?: string;

  updatedAt?: string;

  selected?: boolean;

  BrandModel?: Brand;

  imgUrl?: string;

  keywords?: string;

  meta_description?: string;
}

export interface StylesListResponse {
  data: Style[];
  dataCount: number;
}

export interface StyleResponse {
  data: Style;
}
