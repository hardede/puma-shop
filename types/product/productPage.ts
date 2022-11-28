export interface ImgProductPage {
  productImg: string;
}

export interface SizeSelection {
  sizeEur: number;
  sizeUK: number;
  sizeCountInStock: number;
}

export interface ProductPage {
  _id: string;
  productFor: string;
  slug: string;
  imgProductPage: ImgProductPage[];
  img: string;
  model: string;
  color: string;
  sizeSelection: SizeSelection[];
  atr: string;
  alt: string;
  blur: any;
  price: number;
  sale: number;
  quantity: number;
  countInStock: number;
  size: number;
}
