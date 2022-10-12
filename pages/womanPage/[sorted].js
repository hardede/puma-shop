import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Layout from "../../components/Layout/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectProductsState,
  sortByAscending,
  sortByDescending,
  sortByDiscount,
} from "../../store/reducers/ProductSlice";
import data from "../../utils/data";

const SortedScreen = ({ title, category }) => {
  const productSort = useAppSelector(selectProductsState);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Layout>
      <div className="container max-w-[1140px] mx-auto mt-20 py-2">
        <Link href="/">back to products</Link>
        <div className="mt-20 ">
          <div className="flex items-center mb-6">
            <h1 className="font-bold uppercase text-2xl">goods for Woman</h1>
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
                      <p>shoes</p>
                      <p>Clothes</p>
                      <p>Accessories</p>
                    </div>
                  )}
                </div>
                <div className="before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-4">
                  <div
                    className="flex justify-between items-center py-4"
                    onClick={() => setPriceOpen(!priceOpen)}
                  >
                    <h3 className="uppercase font-bold text-[#2f2f2f]">
                      Price
                    </h3>
                    {priceOpen ? (
                      <AiOutlineMinus className="mr-4 cursor-pointer" />
                    ) : (
                      <AiOutlinePlus className="mr-4 opacity-50 cursor-pointer" />
                    )}
                  </div>
                  {priceOpen && (
                    <div>
                      <Range min={40} max={1000} tabIndex={[1, 1]} />
                      <div className="flex justify-between my-2">
                        <span>from 423</span>
                        <span>to 42300</span>
                      </div>
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
                    <div>
                      <p>shoes</p>
                      <p>Clothes</p>
                      <p>Accessories</p>
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

                <Link href={`/womanPage`}>
                  <a className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
                    Default sort
                  </a>
                </Link>
                <Link
                  href={`/womanPage/product_list_order=price&product_list_dir=asc`}
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
                  href={`/womanPage/product_list_order=price&product_list_dir=desc`}
                  replace
                >
                  <a
                    className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                    onClick={() => dispatch(sortByDescending(data.sneakersMan))}
                  >
                    Price: Descending
                  </a>
                </Link>
                <Link href={`/womanPage/product_list_order=discount`} replace>
                  <a
                    className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                    onClick={() => dispatch(sortByDiscount(data.sneakersMan))}
                  >
                    Maximum discount
                  </a>
                </Link>
                {/* <div className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
                  <p>Novelties</p>
                </div> */}
              </div>
              <div className="flex  flex-wrap">
                {productSort.map(item => (
                  <div
                    key={item.id}
                    className="max-w-[220px] min-h-[401px] relative p-2.5 hover:border hover:border-[#cccccc] mx-[2.5px] mb-5"
                  >
                    <Link href={`/product/${item.slug}`}>
                      <a draggable="false">
                        <div className="absolute bg-red-600 w-10 text-center items-center">
                          <span className="text-white text-sm font-bold ">
                            {item.sale}
                          </span>
                        </div>
                        <div className="relative -z-10 after:block after:w-full after:h-0.5 after:bg-[#cccccc]">
                          <Image
                            src={item.img}
                            width="220"
                            height="220"
                            alt={item.alt}
                            placeholder="blur"
                            blurDataURL={item.blur}
                          />
                        </div>
                        <div className="pt-5">
                          <p className="text-center pb-5">{item.model}</p>
                          <div className="flex justify-center items-center">
                            <span className="font-semibold mr-3">
                              {item.newPrice
                                .toString()
                                .split(" ")
                                .toLocaleString()
                                .concat(",00 ₴")}
                            </span>
                            {item.oldPrice && (
                              <span className="font-light text-sm line-through decoration-2 decoration-red-500">
                                {item.oldPrice
                                  .toString()
                                  .split(" ")
                                  .toLocaleString()
                                  .concat(",00 ₴")}
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SortedScreen;

{
  /* <p className="font-medium uppercase text-[#828282] mr-4">
                sort by:
              </p>
              <div className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
                <p>Default sort</p>
              </div>
              <div
                className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                onClick={() => dispatch(sortByAscending(data.sneakersMan))}
              >
                <p>Price: Ascending</p>
              </div>
              <div className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
                <p>Price: descending</p>
              </div>
              <div className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
                <p>Maximum discount</p>
              </div>
              <div className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
                <p>Novelties</p>
              </div> */
}
