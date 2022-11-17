import { useEffect, useState } from "react";
import { ProductPage } from "../types/product/productPage";

const useRandomSneakers = ({ products }: any) => {
  const [randomSneakers, setRandomSneakers] = useState<ProductPage[]>([]);

  useEffect(() => {
    const RandomUniqueSneakers = Array.from({ length: 8 }).map((_, index) => {
      let ind = Math.floor(Math.random() * products.length);
      let sneakers = products[ind];
      return sneakers;
    });
    setRandomSneakers(RandomUniqueSneakers);
  }, [products]);
  return randomSneakers;
};

export default useRandomSneakers;
