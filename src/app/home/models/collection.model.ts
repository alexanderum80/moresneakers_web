export interface Collection {
  id?: string;
  name: string;
  brand?: string;
  createdAt?: string;
  description?: string;
  // faces?: Array<Face>;
  // images?: Array<Face>;
  imgUrl?: string;
  updatedAt?: string;
  keywords?: string;
  meta_description?: string;
}

export interface CollectionsListResponse {
  data: Collection[];
  dataCount: number;
}

export interface CollectionResponse {
  data: Collection;
}
