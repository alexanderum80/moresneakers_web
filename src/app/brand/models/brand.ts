export interface Brand {
  id?: string;
  name: string;
  description?: string;
  imgUrl?: string;
  updatedAt?: string;
  createdAt?: string;
  popularStyle?: any;
  keywords?: string;
  meta_description?: string;
}

export interface BrandsListResponse {
  data: Brand[];
  dataCount: number;
}

export interface BrandResponse {
  data: Brand;
}
