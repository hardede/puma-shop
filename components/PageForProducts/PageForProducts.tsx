import Link from "next/link";
import { useRouter } from "next/router";
import "rc-slider/assets/index.css";
import { FC, useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../hooks/redux";
import {
  sortByAscending,
  sortByDescending,
  sortByDiscount,
} from "../../store/reducers/ProductSlice";
import { ProductPage } from "../../types/product/productPage";
import { sizeSort } from "../../types/sizeSort";
import data from "../../utils/data";
import { sizes } from "../constants/sizes";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import ProductsPage from "./ProductsPage/ProductsPage";
import SizeSort from "./SizeSort/SizeSort";

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
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="mt-20 py-2" title={title}>
      <p onClick={() => router.back()}>back to products</p>
      <div className="mt-20 ">
        <div className="flex items-center mb-6">
          <h1 className="font-bold uppercase text-2xl">{category}</h1>
          <span className="pl-4 opacity-50 font-bold uppercase">
            {data.sneakersMan.length} goods
          </span>
        </div>
        <div className="flex">
          <div className="mr-5">
            <h1 className="uppercase font-bold text-2xl mb-6">Filters</h1>
            <div className="w-[220px]">
              <div className="before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-4">
                <div
                  className="flex justify-between items-center py-4"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                >
                  <h3 className="uppercase font-bold text-[#2f2f2f]">
                    product category
                  </h3>
                  {categoryOpen ? (
                    <AiOutlineMinus className="mr-4  cursor-pointer" />
                  ) : (
                    <AiOutlinePlus className="mr-4 opacity-50 cursor-pointer" />
                  )}
                </div>
                {categoryOpen && (
                  <div>
                    <p className="text-sm opacity-60 hover:text-red-600 transition-all ease-in-out duration-300 cursor-pointer hover:text-base">
                      Shoes
                    </p>
                    <p className="text-sm opacity-60  transition-all ease-in-out duration-300 cursor-pointer ">
                      Clothes
                    </p>
                    <p className="text-sm opacity-60 transition-all ease-in-out duration-300 cursor-pointer ">
                      Accessories
                    </p>
                  </div>
                )}
              </div>
              <div
                className={
                  priceOpen
                    ? "before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-12"
                    : "before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-4"
                }
              >
                <div
                  className="flex justify-between items-center py-4"
                  onClick={() => setPriceOpen(!priceOpen)}
                >
                  <h3 className="uppercase font-bold text-[#2f2f2f]">Price</h3>
                  {priceOpen ? (
                    <AiOutlineMinus className="mr-4 cursor-pointer" />
                  ) : (
                    <AiOutlinePlus className="mr-4 opacity-50 cursor-pointer" />
                  )}
                </div>
                {priceOpen && (
                  <div>
                    <MultiRangeSlider
                      min={989}
                      max={19999}
                      sneakers={data.sneakersMan}
                      onChange={({ min, max }: any) =>
                        console.log(`min = ${min}, max = ${max}`)
                      }
                    />
                  </div>
                )}
              </div>
              <div className="before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-4">
                <div
                  className="flex justify-between items-center py-4"
                  onClick={() => setSizeOpen(!sizeOpen)}
                >
                  <h3 className="uppercase font-bold text-[#2f2f2f]">Size</h3>
                  {sizeOpen ? (
                    <AiOutlineMinus className="mr-4 cursor-pointer" />
                  ) : (
                    <AiOutlinePlus className="mr-4 opacity-50 cursor-pointer" />
                  )}
                </div>
                {sizeOpen && (
                  <div className="flex flex-wrap">
                    {sizes.map((item: sizeSort) => (
                      <SizeSort key={item.id} size={item.size} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center border-b-2 border-black pb-5 mb-5">
              <p className="font-medium uppercase text-[#828282] mr-4">
                sort by:
              </p>

              <Link href={`${router.pathname}`} replace>
                <a
                  className={
                    router.pathname === router.pathname
                      ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer"
                      : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                  }
                >
                  {router.pathname === router.pathname ? (
                    <div className="flex">
                      <p className="px-3 border-r border-white">Default sort</p>
                      <AiOutlineClose className="fill-white text-2xl cursor-pointer  ml-1 hover:bg-white hover:fill-black" />
                    </div>
                  ) : (
                    "Default sort"
                  )}
                </a>
              </Link>
              <Link
                href={`${router.pathname}/product_list_order=price&product_list_dir=asc`}
                replace
              >
                <a
                  className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                  onClick={() => dispatch(sortByAscending(data.sneakersMan))}
                >
                  Price: Ascending
                </a>
              </Link>
              <Link
                href={`${router.pathname}/product_list_order=price&product_list_dir=desc`}
                replace
              >
                <a
                  className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                  onClick={() => dispatch(sortByDescending(data.sneakersMan))}
                >
                  Price: Descending
                </a>
              </Link>
              <Link
                href={`${router.pathname}/product_list_order=discount`}
                replace
              >
                <a
                  className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                  onClick={() => dispatch(sortByDiscount(data.sneakersMan))}
                >
                  Maximum discount
                </a>
              </Link>
            </div>
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
