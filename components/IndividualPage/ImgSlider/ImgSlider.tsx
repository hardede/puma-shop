import Image from "next/image";
import { FC, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import {
  ImgProductPage,
  ProductPage
} from "../../../types/product/productPage";

interface ImgSliderProps {
  product: ProductPage;
  saleString?: string;
}

const ImgSlider: FC<ImgSliderProps> = ({ product, saleString }) => {
  const [current, setCurrent] = useState(0);

  const onClickNext = (current: number) => {
    current >= product.imgProductPage.length - 1
      ? setCurrent(0)
      : setCurrent(current + 1);
  };
  const onClickPrev = (current: number) => {
    current <= 0
      ? setCurrent(product.imgProductPage.length - 1)
      : setCurrent(current - 1);
  };

  return (
    <div className="flex md:hidden">
      <div className="scroll flex flex-col my-1 max-h-[350px] overflow-scroll scroll-y md:hidden">
        {product.imgProductPage.map((item: ImgProductPage, index: number) => (
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
              alt={item.productImg}
              draggable="false"
            />
          </div>
        ))}
      </div>
      <div className="translate-y-1/2 md:hidden">
        <MdArrowForwardIos
          className="rotate-180 w-9 h-9 cursor-pointer"
          onClick={() => onClickPrev(current)}
        />
      </div>
      <div className="md:mr-5">
        {product.imgProductPage.map((item: ImgProductPage, index: number) => (
          <div
            key={item.productImg}
            className={
              index === current
                ? "relative transition-all ease-in-out duration-500"
                : "relative hidden transition-all ease-in-out duration-500"
            }
          >
            {product.sale !== 0 && (
              <div className="absolute right-0 bg-red-600 w-20 py-2 text-center items-center md:w-14">
                <span className="text-white text-xl font-bold md:text-base">
                  {saleString}
                </span>
              </div>
            )}
            <div className="relative -z-10">
              <Image
                src={item.productImg}
                width={459}
                height={459}
                objectFit="contain"
                draggable="false"
                alt={item.productImg}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="translate-y-1/2 md:hidden">
        <MdArrowForwardIos
          className="w-9 h-9 cursor-pointer"
          onClick={() => onClickNext(current)}
        />
      </div>
    </div>
  );
};

export default ImgSlider;
