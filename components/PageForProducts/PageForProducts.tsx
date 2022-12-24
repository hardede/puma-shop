import { useRouter } from "next/router";
import "rc-slider/assets/index.css";
import { FC } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ProductPage } from "../../types/product/productPage";
import LeftFilters from "../SortedProducts/LeftFilters/LeftFilters";
import ProductsPage from "./ProductsPage/ProductsPage";
import SortedFilters from "./SortedFilters/SortedFilters";

interface PageForProductsProps {
  title: string;
  category: string;
  products: ProductPage[];
}

const PageForProducts: FC<PageForProductsProps> = ({
  title,
  category,
  products,
}) => {
  const router = useRouter();

  return (
    <div className="mt-20 py-2" title={title}>
      <div
        onClick={() => router.back()}
        className="flex items-center cursor-pointer"
      >
        <AiOutlineArrowLeft className="w-10 h-7" />
        <p className="uppercase text-sm">back</p>
      </div>
      <div className="mt-20 md:mt-10 xs:mt-5">
        <div className="flex items-center mb-6">
          <h1 className="font-bold uppercase text-2xl">{category}</h1>
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
            <div className="flex flex-wrap">
              {products.map((item: ProductPage) => (
                <ProductsPage key={item._id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageForProducts;
