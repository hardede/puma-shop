import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useCountValues from "../../hooks/useCountValues";
import useWindowSize from "../../hooks/useWindowSize";
import { ProductPage } from "../../types/product/productPage";

interface SearchSneakersModalProps {
  searchProduct: ProductPage;
}

const SearchSneakersModal: FC<SearchSneakersModalProps> = ({
  searchProduct,
}) => {
  const [imageSize, setImageSize] = useState(false)
   const size = useWindowSize();
  const { priceWithSaleString, priceString } = useCountValues(
    searchProduct.price,
    searchProduct.sale
  );
  useEffect(() => {
    setImageSize(size.width <= 767);
  }, [size]);

  return (
    <Link href={`/product/${searchProduct.slug}`}>
      <div className="my-2 flex items-center cursor-pointer">
        <div>
          {imageSize ? (
            <Image
              src={searchProduct.img}
              alt={searchProduct.alt}
              width={100}
              height={100}
            />
          ) : (
            <Image
              src={searchProduct.img}
              alt={searchProduct.alt}
              width={50}
              height={50}
            />
          )}
        </div>
        <div className="ml-10 xs:ml-4">
          <h5 className="text-black">{searchProduct.model}</h5>
          <div>
            <span
              className={
                searchProduct.sale !== 0
                  ? "font-bold text-red-500 pr-2 text-sm"
                  : "font-bold text-black pr-2 text-sm"
              }
            >
              {searchProduct.sale === 0 ? priceString : priceWithSaleString}
            </span>
            <span className="font-normal text-xs text-[#555555] line-through decoration-1 decoration-[#555555]">
              {searchProduct.sale !== 0 ? priceString : ""}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchSneakersModal;
