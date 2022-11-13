import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";
import Layout from "../../components/Layout/Layout";
import { useAppDispatch } from "../../hooks/redux";
import Product from "../../models/Product";
import { cartAdd } from "../../store/reducers/CartSlice";
import db from "../../utils/db";

const ProductScreen = props => {
  const { product } = props;
  const [current, setCurrent] = useState(0);
  const [showSize, setShowSize] = useState(false);
  const [productSize, setProductSize] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }

  const addToCartHandler = async () => {
    dispatch(cartAdd({ product, productSize, countInStock }));
  };

  const onClickNext = current => {
    current >= product.imgProductPage.length - 1
      ? setCurrent(0)
      : setCurrent(current + 1);
  };
  const onClickPrev = current => {
    current <= 0
      ? setCurrent(product.imgProductPage.length - 1)
      : setCurrent(current - 1);
  };

  const onClickSize = (size, qty) => {
    setProductSize(size);
    setCountInStock(Number(qty));
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "center",
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout title={product.model}>
      <div className="container m-auto">
        <div className="mt-[80px] py-2">
          <div onClick={() => router.back()}>back to products</div>
        </div>
        <div className="flex w-[1050px] justify-between mx-auto">
          <div className="flex">
              <div className="flex flex-col my-1 max-h-[340px] overflow-hidden">
                {product.imgProductPage.map((item, index) => (
                  <div
                    key={item.productImg}
                    className={
                      index === current
                        ? "after:w-full after:bg-[#ff0000] after:h-0.5 after:block transition-all ease-in-out duration-500 after:mb-1.5"
                        : "after:w-full after:bg-[#e1e1e1] after:h-0.5 after:block after:hover:w-full after:hover:bg-black after:hover:h-0.5 after:hover:block transition-all ease-in-out duration-500 after:mb-1.5"
                    }
                    onClick={() => setCurrent(index)}
                  >
                    <Image
                      src={item.productImg}
                      width={70}
                      height={70}
                      alt={item.alt}
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            <div className="translate-y-1/2">
              <MdArrowForwardIos
                className="rotate-180 w-9 h-9 cursor-pointer"
                onClick={() => onClickPrev(current)}
              />
            </div>
            <div className="">
              {product.imgProductPage.map((item, index) => (
                <div
                  key={item.productImg}
                  className={
                    index === current
                      ? "transition-all ease-in-out duration-500"
                      : "hidden transition-all ease-in-out duration-500"
                  }
                >
                  <Image
                    src={item.productImg}
                    width={459}
                    height={459}
                    objectFit="contain"
                    draggable="false"
                    alt={item.alt}
                  ></Image>
                </div>
              ))}
            </div>
            <div className="translate-y-1/2">
              <MdArrowForwardIos
                className="w-9 h-9 cursor-pointer"
                onClick={() => onClickNext(current)}
              />
            </div>
          </div>
          <div className="w-[380px]">
            <h1 className="font-bold text-2xl uppercase pb-8">
              {product.model}
            </h1>
            <div className="pb-2 flex justify-between items-center">
              <div>
                <span className="font-bold text-xl mr-4">
                  {product.newPriceString}
                </span>
                <span
                  className={
                    product.oldPrice === 0
                      ? "line-through decoration-2 decoration-red-500 hidden"
                      : "line-through decoration-2 decoration-red-500"
                  }
                >
                  {product.oldPriceString}
                </span>
              </div>
              <span className="opacity-60 text-sm">Art: {product.atr}</span>
            </div>
            {product.sale && (
              <p className="pb-8 uppercase text-[#ff0000] text-xs font-bold">
                + 5% discount and free shipping when paying online
              </p>
            )}

            <p className="mb-2">Color: {product.color}</p>
            <div className="mb-4">
              <div
                onClick={() => setShowSize(!showSize)}
                className="cursor-pointer flex justify-between items-center w-[150px] px-4 py-1 border border-[#acacac]"
              >
                <div className="flex flex-col">
                  <span className="text-sm">Size</span>
                  <span className="font-bold">
                    {productSize === "" ? "Choose" : `${productSize} EUR`}
                  </span>
                </div>
                <MdArrowForwardIos
                  className={showSize ? "-rotate-90" : "rotate-90"}
                />
              </div>
              <div
                className={
                  showSize
                    ? "flex w-[272px] flex-wrap border border-[#acacac]"
                    : "hidden"
                }
                onClick={() => setShowSize(false)}
              >
                {product.sizeSelection.map((item, index) => (
                  <Link
                    key={index}
                    href={`/product/${product.slug}/?size=${item.sizeEur}`}
                  >
                    <a
                      className={
                        item.sizeCountInStock === 0
                          ? "flex flex-col min-w-[90px] items-center border border-[#acacac] cursor-pointer hover:font-bold opacity-30 pointer-events-none"
                          : "flex flex-col min-w-[90px] items-center border border-[#acacac] cursor-pointer hover:font-bold"
                      }
                      onClick={() =>
                        onClickSize(item.sizeEur, item.sizeCountInStock)
                      }
                    >
                      <span>{item.sizeEur} EUR</span>
                      <span>({item.sizeUK} UK)</span>
                    </a>
                  </Link>
                ))}
              </div>

              {/* <select
                value={product.quantity}
                onChange={e => updateCartHandler}
              >
                <option
                  value={product.sizeSelection.sizeCountInStock}
                >
                  {product.sizeSelection.sizeCountInStock}
                </option>
              </select> */}
              {/* <select
                value={product.quantity}
                onChange={e => updateCartHandler(product, e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map(x => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select> */}
            </div>
            <button
              className="uppercase w-full text-white bg-[#f00] font-bold py-3 hover:bg-[#c00] transition-all ease-in-out duration-300"
              onClick={addToCartHandler}
              disabled={productSize === ""}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
