import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppSelector } from "../../../hooks/redux";
import { selectProductsState } from "../../../store/reducers/ProductSlice";
import { ProductPage } from "../../../types/product/productPage";
import LeftFilters from "../LeftFilters/LeftFilters";
import SortedItems from "../SortedItems/SortedItems";
import SortedFilters from "./SortedFilters/SortedFilters";

interface SortedWomanProps {
  products: ProductPage[];
}

const SortedWoman: FC<SortedWomanProps> = ({ products }) => {
  const productSort = useAppSelector(selectProductsState);
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.back()}
        className="flex items-center cursor-pointer"
      >
        <AiOutlineArrowLeft className="w-10 h-7" />
        <p className="uppercase text-sm">back</p>
      </div>
      <div className="mt-20 ">
        <div className="flex items-center mb-6">
          <h1 className="font-bold uppercase text-2xl">goods for woman</h1>
          <span className="pl-4 opacity-50 font-bold uppercase">
            {products.length} goods
          </span>
        </div>
        <div className="grid grid-cols-[220px_auto] gap-5 md:grid-cols-2">
          <div className="row-span-2 md:row-span-1">
            <LeftFilters products={products} />
          </div>
          <SortedFilters products={products} />
          <div className="md:col-span-2">
            {productSort.length === 0 ? (
              <div className="text-center font-bold text-xl text-red-500">
                No products found for the given parameter
              </div>
            ) : (
              <div className="flex justify-around flex-wrap">
                {productSort.map((item: ProductPage) => (
                  <SortedItems key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SortedWoman;
