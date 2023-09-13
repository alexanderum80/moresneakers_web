export interface Blog {
  author: string;
  brandId?: string;
  id?: string;
  title?: string;
  slug?: string;
  body?: string;
  imgUrl?: string;
  updatedAt?: string;
  createdAt?: string;
  type?: string;
  keywords?: string;
  meta_description?: string;
}

export interface BlogsListResponse {
  data: Blog[];
  dataCount: number;
}

export interface ImageListResponse {
  data: Image[];
  dataCount: number;
}

export interface BlogsResponse {
  data: Array<Blog>;
}

export interface BlogImageResponce {
  imgUrl: string;
}

export interface BlogState {
  blogs?: Blog[];
}

export interface Image {
  id?: string;
  imgUrl: string;
  position: number;
}
