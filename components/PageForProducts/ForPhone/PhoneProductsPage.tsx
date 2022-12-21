import Link from "next/link";
import { useRouter } from "next/router";
import "rc-slider/assets/index.css";
import { FC, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useAppDispatch } from "../../../hooks/redux";
import {
  sortByAscending,
  sortByDescending,
  sortByDiscount,
} from "../../../store/reducers/ProductSlice";
import { ProductPage } from "../../../types/product/productPage";
import { sizeSort } from "../../../types/sizeSort";
import { sizes } from "../../constants/sizes";
import MultiRangeSlider from "../../MultiRangeSlider/MultiRangeSlider";
import ProductsPage from ".././ProductsPage/ProductsPage";
import SizeSort from ".././SizeSort/SizeSort";

interface PhoneProductsPageProps {
  products: ProductPage[];
}

const PhoneProductsPage: FC<PhoneProductsPageProps> = ({ products }) => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div>
      <div className="grid mb-4 grid-cols-2 xs:grid-cols-1">
        <div
          className="w-full px-2 xs:mb-2"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <p className="font-medium uppercase py-1.5 text-[#3f3e3e] cursor-pointer text-center border border-[#bebebe] bg-[#cccccc]">
            Filters
          </p>
          <div
            className={filterOpen ? "" : "hidden"}
            onClick={e => e.stopPropagation()}
          >
            <div className="before:bg-[#dedede] mb-2">
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
                  : "before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-2"
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
                    max={29999}
                    sneakers={products}
                    onChange={({ min, max }: any) =>
                      `min = ${min}, max = ${max}`
                    }
                  />
                </div>
              )}
            </div>
            <div className="before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-2">
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
                    <SizeSort
                      key={item.id}
                      size={item.size}
                      products={products}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full px-2" onClick={() => setSortByOpen(!sortByOpen)}>
          <p className="font-medium uppercase py-1.5 text-[#3f3e3e] cursor-pointer text-center border border-[#bebebe] bg-[#cccccc]">
            sort by:
          </p>
          <div className={sortByOpen ? "" : "hidden"}>
            <div className="flex flex-wrap justify-between items-center border-b-2 border-black pb-5 mb-5">
              <Link href={`${router.pathname}`} replace>
                <a
                  className={
                    router.pathname === router.pathname
                      ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer lg:my-2"
                      : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer lg:my-2"
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
                  className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer text-center"
                  onClick={() => dispatch(sortByAscending(products))}
                >
                  Price: Ascending
                </a>
              </Link>
              <Link
                href={`${router.pathname}/product_list_order=price&product_list_dir=desc`}
                replace
              >
                <a
                  className="p-1 mr-2 my-3 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer text-center"
                  onClick={() => dispatch(sortByDescending(products))}
                >
                  Price: Descending
                </a>
              </Link>
              <Link
                href={`${router.pathname}/product_list_order=discount`}
                replace
              >
                <a
                  className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer text-center"
                  onClick={() => dispatch(sortByDiscount(products))}
                >
                  Maximum discount
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around flex-wrap">
        {products.map((item: ProductPage) => (
          <ProductsPage key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PhoneProductsPage;
