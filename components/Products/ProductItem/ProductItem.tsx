import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { ProductPage } from "../../../types/product/productPage";

interface ProductItemProps {
  sneaker: ProductPage;
}

const ProductItem: FC<ProductItemProps> = ({ sneaker }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="max-w-[250px] h-[317px] relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Link href={`/product/${sneaker.slug}`}>
          <a draggable="false">
            {show && (
              <div className="absolute right-[83px] top-[134px] ">
                <div className=" bg-black z-100 text-white border border-black uppercase font-bold px-6 py-1.5 hover:bg-[#9F9F9F] hover:text-black transition-all ease-in-out duration-500">
                  buy
                </div>
              </div>
            )}
            <div className="absolute bg-red-600 w-10 text-center items-center">
              <span className="text-white text-sm font-bold ">
                {sneaker.sale}
              </span>
            </div>
            <div className="relative -z-10">
              <Image
                src={sneaker.img}
                width="250"
                height="250"
                alt={sneaker.alt}
                placeholder="blur"
                blurDataURL={sneaker.blur}
              />
            </div>
            <div className="">
              <p className="truncate ">{sneaker.model}</p>
              <div className="flex justify-center items-center">
                <span className="font-semibold mr-3">
                  {sneaker.newPriceString}
                </span>
                {sneaker.oldPrice !== 0 && (
                  <span className="font-light text-sm line-through decoration-2 decoration-red-500">
                    {sneaker.oldPriceString}
                  </span>
                )}
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default ProductItem;
