export interface Category {
  id?: string;
  name: string;
  imgUrl?: string;
  description?: string;
  isGender?: boolean;
  gender?: string;
  updatedAt?: string;
  createdAt?: string;
  keywords?: string;
  meta_description?: string;
}

export interface CategoriesListResponse {
  data: Category[];
  dataCount: number;
}

export interface CategoriesResponse {
  data: Category;
}
