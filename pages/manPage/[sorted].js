import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import "rc-slider/assets/index.css";
import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import Layout from "../../components/Layout/Layout";
import MultiRangeSlider from "../../components/MultiRangeSlider/MultiRangeSlider";
import SizeSort from "../../components/PageForProducts/SizeSort/SizeSort";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ProductMan from "../../models/ProductMan";
import {
  selectProductsState,
  sortByAscending,
  sortByDescending,
  sortByDiscount,
} from "../../store/reducers/ProductSlice";
import db from "../../utils/db";

const sizes = [
  {
    id: uuidv4(),
    size: 39,
  },
  {
    id: uuidv4(),
    size: 40,
  },
  {
    id: uuidv4(),
    size: 41,
  },
  {
    id: uuidv4(),
    size: 42,
  },
  {
    id: uuidv4(),
    size: 43,
  },
  {
    id: uuidv4(),
    size: 44,
  },
];

const SortedScreen = ({ products }) => {
  const productSort = useAppSelector(selectProductsState);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Layout title="Sorted products Woman">
      <div className="container max-w-[1140px] mx-auto mt-20 py-2">
        <Link href="/">back to products</Link>
        <div className="mt-20 ">
          <div className="flex items-center mb-6">
            <h1 className="font-bold uppercase text-2xl">goods for men</h1>
            <span className="pl-4 opacity-50 font-bold uppercase">
              {products.length} goods
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
                      <p className="text-sm opacity-60 hover:text-red-600 transition-all ease-in-out duration-300 cursor-pointer ">
                        Clothes
                      </p>
                      <p className="text-sm opacity-60 hover:text-red-600 transition-all ease-in-out duration-300 cursor-pointer ">
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
                      <MultiRangeSlider
                        min={989}
                        max={29999}
                        sneakers={products}
                        onChange={({ min, max }) =>
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
                      {sizes.map(item => (
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
            <div className="w-full">
              <div className="flex items-center border-b-2 border-black pb-5 mb-5">
                <p className="font-medium uppercase text-[#828282] mr-4">
                  sort by:
                </p>
                <Link href={`/manPage`}>
                  <a className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
                    Default sort
                  </a>
                </Link>
                <div></div>
                <Link
                  href={`/manPage/product_list_order=price&product_list_dir=asc`}
                  replace
                >
                  <a
                    className={
                      router.asPath ===
                      `/manPage/product_list_order=price&product_list_dir=asc`
                        ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer"
                        : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                    }
                  >
                    {router.asPath ===
                    `/manPage/product_list_order=price&product_list_dir=asc` ? (
                      <div className="flex">
                        <p className="px-3 border-r border-white">
                          Price: Ascending
                        </p>
                        <Link href="/manPage">
                          <div>
                            <AiOutlineClose className="fill-white text-2xl cursor-pointer  ml-1 hover:bg-white hover:fill-black" />
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div onClick={() => dispatch(sortByAscending(products))}>
                        Price: Ascending
                      </div>
                    )}
                  </a>
                </Link>
                <Link
                  href={`/manPage/product_list_order=price&product_list_dir=desc`}
                  replace
                >
                  <a
                    className={
                      router.asPath ===
                      `/manPage/product_list_order=price&product_list_dir=desc`
                        ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer"
                        : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                    }
                  >
                    {router.asPath ===
                    `/manPage/product_list_order=price&product_list_dir=desc` ? (
                      <div className="flex">
                        <p className="px-3 border-r border-white">
                          Price: Descending
                        </p>
                        <Link href="/manPage">
                          <div>
                            <AiOutlineClose className="fill-white text-2xl cursor-pointer  ml-1 hover:bg-white hover:fill-black" />
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div onClick={() => dispatch(sortByDescending(products))}>
                        Price: Descending
                      </div>
                    )}
                  </a>
                </Link>
                <Link href={`/manPage/product_list_order=discount`} replace>
                  <a
                    className={
                      router.asPath === `/manPage/product_list_order=discount`
                        ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer"
                        : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
                    }
                  >
                    {router.asPath ===
                    `/manPage/product_list_order=discount` ? (
                      <div className="flex">
                        <p className="px-3 border-r border-white">
                          Maximum discount
                        </p>
                        <Link href="/manPage">
                          <div>
                            <AiOutlineClose className="fill-white text-2xl cursor-pointer  ml-1 hover:bg-white hover:fill-black" />
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div onClick={() => dispatch(sortByDiscount(products))}>
                        Maximum discount
                      </div>
                    )}
                  </a>
                </Link>
              </div>
              <div>
                {productSort.length === 0 ? (
                  <div className="text-center font-bold text-xl text-red-500">
                    No products found for the given parameter
                  </div>
                ) : (
                  <div className="flex flex-wrap">
                    {productSort.map(item => (
                      <div
                        key={item._id}
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
                                {item.oldPrice !== 0 && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SortedScreen;

export async function getServerSideProps() {
  await db.connect();
  const products = await ProductMan.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
