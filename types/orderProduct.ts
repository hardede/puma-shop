export interface ImgProductPage {
  productImg: string;
}

export interface SizeSelection {
  sizeEur: number;
  sizeUK: number;
  sizeCountInStock: number;
}

export interface OrderedProduct {
  id: string;
  slug: string;
  imgProductPage: ImgProductPage[];
  img: string;
  model: string;
  color: string;
  sizeSelection: SizeSelection[];
  atr: string;
  alt: string;
  blur: any;
  newPrice: number;
  oldPrice: number;
  newPriceString: string;
  oldPriceString: string;
  sale: string;
  quantity: number;
  countInStock: number;
  size: number;
}
