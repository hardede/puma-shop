export interface ProductPage {
  id: string;
  slug: string;
  imgProductPage: {
    productImg: string;
  }[];
  img: string;
  model: string;
  color: string;
  sizeSelection: {
    sizeEur: number;
    sizeUK: number;
    sizeCountInStock: number;
  }[];
  atr: string;
  alt: string;
  blur: any;
  newPrice: number;
  oldPrice: number;
  newPriceString: string;
  oldPriceString: string;
  sale: string;
}
