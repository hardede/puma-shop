import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppDispatch } from "../../hooks/redux";
import useCountValues from "../../hooks/useCountValues";
import useWindowSize from "../../hooks/useWindowSize";
import { cartAdd } from "../../store/reducers/CartSlice";
import { ProductPage, SizeSelection } from "../../types/product/productPage";
import ImgSlider from "./ImgSlider/ImgSlider";

interface IndividualPageProps {
  product: ProductPage;
}

const IndividualPage: FC<IndividualPageProps> = ({ product }) => {
  const [showSize, setShowSize] = useState(false);
  const [phonePage, setPhonePage] = useState(false);
  const [productSize, setProductSize] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const { priceWithSale, priceWithSaleString, priceString, saleString } =
    useCountValues(product.price, product.sale);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const size = useWindowSize();

  useEffect(() => {
    setPhonePage(size.width <= 768);
  }, [size]);

  if (!product) {
    return <div title="Product not found">Product not found</div>;
  }

  const addToCartHandler = async () => {
    dispatch(cartAdd({ product, productSize, countInStock }));
  };

  const onClickSize = (size: number, qty: number) => {
    setProductSize(size);
    setCountInStock(qty);
  };

  return (
    <>
      <div
        onClick={() => router.back()}
        className="flex items-center cursor-pointer"
      >
        <AiOutlineArrowLeft className="w-10 h-7" />
        <p className="uppercase text-sm">back</p>
      </div>
      <div className="flex mt-20 justify-between mx-auto md:justify-center">
        <ImgSlider product={product} saleString={saleString} />
        <div className="w-[380px] md:w-auto">
          <h1 className="font-bold text-2xl uppercase pb-8 md:text-xl">
            {product.model}
          </h1>
          <div className="pb-2 flex justify-between items-center">
            <div>
              {priceWithSale ? (
                <span className="font-bold text-xl mr-4 xs:mr-2 xs:text-lg xs:font-semibold">
                  {priceWithSaleString}
                </span>
              ) : (
                <span className="font-bold text-xl mr-4 xs:mr-2 xs:text-lg xs:font-semibold">
                  {priceString}
                </span>
              )}
              {priceWithSale && (
                <span className="line-through decoration-2 decoration-red-500">
                  {priceString}
                </span>
              )}
            </div>
            <span className="opacity-60 text-sm">Art: {product.atr}</span>
          </div>
          {product.sale !== 0 && (
            <p className="pb-8 uppercase text-[#ff0000] text-xs font-bold">
              + 5% discount and free shipping when paying online
            </p>
          )}
          {phonePage ? (
            <div className="relative">
              {product.sale !== 0 && (
                <div className="absolute right-0 bg-red-600 w-20 py-2 text-center items-center md:w-14">
                  <span className="text-white text-xl font-bold md:text-base">
                    {saleString}
                  </span>
                </div>
              )}
              <div className="w-full relative -z-10">
                <Image
                  src={product.img}
                  width={540}
                  height={540}
                  objectFit="contain"
                  draggable="false"
                  alt={product.alt}
                />
              </div>
            </div>
          ) : null}
          <p className="mb-2">Color: {product.color}</p>
          <div className="mb-4">
            <div
              onClick={() => setShowSize(!showSize)}
              className="cursor-pointer flex justify-between items-center w-[150px] px-4 py-1 border border-[#acacac]"
            >
              <div className="flex flex-col">
                <span className="text-sm">Size</span>
                <span className="font-bold">
                  {productSize === 0 ? "Choose" : `${productSize} EUR`}
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
              {product.sizeSelection.map((item: SizeSelection) => (
                <Link
                  key={item.sizeEur}
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
          </div>
          <button
            className="uppercase w-full text-white bg-[#f00] font-bold py-3 hover:bg-[#c00] transition-all ease-in-out duration-300"
            onClick={addToCartHandler}
            disabled={productSize === 0}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default IndividualPage;
