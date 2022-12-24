import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "../../../hooks/redux";
import useWindowSize from "../../../hooks/useWindowSize";
import {
  sortByAscending,
  sortByDescending,
  sortByDiscount,
} from "../../../store/reducers/ProductSlice";
import { ProductPage } from "../../../types/product/productPage";
import PhoneSorted from "./PhoneSorted";

interface SortedFiltersProps {
  products: ProductPage[];
}

const SortedFilters: FC<SortedFiltersProps> = ({ products }) => {
  const [phonePage, setPhonePage] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const size = useWindowSize();

  useEffect(() => {
    setPhonePage(size.width <= 768);
  }, [size]);

  return (
    <>
      {phonePage ? (
        <PhoneSorted products={products} />
      ) : (
        <div className="flex flex-wrap items-center border-b-2 border-black pb-5 mb-5">
          <p className="font-medium uppercase text-[#828282] mr-4 ">sort by:</p>
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
              className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
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
              className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
              onClick={() => dispatch(sortByDescending(products))}
            >
              Price: Descending
            </a>
          </Link>
          <Link href={`${router.pathname}/product_list_order=discount`} replace>
            <a
              className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
              onClick={() => dispatch(sortByDiscount(products))}
            >
              Maximum discount
            </a>
          </Link>
        </div>
      )}
    </>
  );
};

export default SortedFilters;
