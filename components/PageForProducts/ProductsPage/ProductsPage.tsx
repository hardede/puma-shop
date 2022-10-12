import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Product } from "../../../types/product";

interface ProductsPageProps {
  item: Product;
}

const ProductsPage: FC<ProductsPageProps> = ({ item }) => {
  return (
    <>
      <div className="max-w-[220px] min-h-[401px] relative p-2.5 hover:border hover:border-[#cccccc] mx-[2.5px] mb-5">
        <Link href={`/product/${item.slug}`}>
          <a draggable="false">
            <div className="absolute bg-red-600 w-10 text-center items-center">
              <span className="text-white text-sm font-bold ">{item.sale}</span>
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
                  {item.newPriceString}
                </span>
                {item.oldPrice !== 0 && (
                  <span className="font-light text-sm line-through decoration-2 decoration-red-500">
                    {item.oldPriceString}
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

export default ProductsPage;
