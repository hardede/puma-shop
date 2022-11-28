import Link from "next/link";
import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { selectProductsState } from "../../../store/reducers/ProductSlice";
import { ProductPage } from "../../../types/product/productPage";
import LeftFilters from "../LeftFilters";
import SortedItems from "../SortedItems/SortedItems";
import SortedFilters from "./SortedFilters/SortedFilters";

interface SortedWomanProps {
  products: ProductPage[];
}

const SortedWoman: FC<SortedWomanProps> = ({ products }) => {
  const productSort = useAppSelector(selectProductsState);

  return (
    <>
      <Link href="/">back to products</Link>
      <div className="mt-20 ">
        <div className="flex items-center mb-6">
          <h1 className="font-bold uppercase text-2xl">goods for men</h1>
          <span className="pl-4 opacity-50 font-bold uppercase">
            {products.length} goods
          </span>
        </div>
        <div className="flex">
          <LeftFilters products={products} />
          <div className="w-full">
            <SortedFilters products={products} />
            <div>
              {productSort.length === 0 ? (
                <div className="text-center font-bold text-xl text-red-500">
                  No products found for the given parameter
                </div>
              ) : (
                <div className="flex flex-wrap">
                  {productSort.map((item: ProductPage) => (
                    <SortedItems key={item._id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortedWoman;
