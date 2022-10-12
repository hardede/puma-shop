export interface Product {
  id: string;
  slug: string;
  img: string;
  model: string;
  alt: string;
  blur?: any;
  newPrice: number;
  oldPrice: number;
  newPriceString: string;
  oldPriceString: string;
  sale?: string;
}
