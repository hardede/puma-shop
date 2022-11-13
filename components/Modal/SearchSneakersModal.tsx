import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ProductTypes } from "../../types/product";

interface SearchSneakersModalProps {
  searchProduct: ProductTypes;
}

const SearchSneakersModal: FC<SearchSneakersModalProps> = ({
  searchProduct,
}) => {
  return (
    <Link href={`/product/${searchProduct.slug}`}>
      <div className="flex justify-between items-center cursor-pointer">
        <div>
          <Image
            src={searchProduct.img}
            alt={searchProduct.alt}
            width={50}
            height={50}
          />
        </div>
        <div className="max-w-[250px]">
          <h5 className="text-black">{searchProduct.model}</h5>
          <div>
            <span
              className={
                searchProduct.oldPrice
                  ? "font-bold text-red-500 pr-2 text-sm"
                  : "font-bold text-black pr-2 text-sm"
              }
            >
              {searchProduct.newPriceString}
            </span>
            <span className="font-normal text-xs text-[#555555] line-through decoration-1 decoration-[#555555]">
              {searchProduct.oldPrice ? searchProduct.oldPriceString : ""}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchSneakersModal;
