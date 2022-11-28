import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  sortByAscending,
  sortByDescending,
  sortByDiscount,
} from "../../../../store/reducers/ProductSlice";
import { ProductPage } from "../../../../types/product/productPage";

interface SortedFiltersProps {
  products: ProductPage[];
}

const SortedFilters: FC<SortedFiltersProps> = ({ products }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center border-b-2 border-black pb-5 mb-5">
      <p className="font-medium uppercase text-[#828282] mr-4">sort by:</p>
      <Link href={`/womanPage`}>
        <a className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer">
          Default sort
        </a>
      </Link>
      <div></div>
      <Link
        href={`/womanPage/product_list_order=price&product_list_dir=asc`}
        replace
      >
        <a
          className={
            router.asPath ===
            `/womanPage/product_list_order=price&product_list_dir=asc`
              ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer"
              : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
          }
        >
          {router.asPath ===
          `/womanPage/product_list_order=price&product_list_dir=asc` ? (
            <div className="flex">
              <p className="px-3 border-r border-white">Price: Ascending</p>
              <Link href="/womanPage">
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
        href={`/womanPage/product_list_order=price&product_list_dir=desc`}
        replace
      >
        <a
          className={
            router.asPath ===
            `/womanPage/product_list_order=price&product_list_dir=desc`
              ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer"
              : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
          }
        >
          {router.asPath ===
          `/womanPage/product_list_order=price&product_list_dir=desc` ? (
            <div className="flex">
              <p className="px-3 border-r border-white">Price: Descending</p>
              <Link href="/womanPage">
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
      <Link href={`/womanPage/product_list_order=discount`} replace>
        <a
          className={
            router.asPath === `/womanPage/product_list_order=discount`
              ? "p-1 mr-2 border border-[#ccc] bg-black text-white hover:text-white cursor-pointer"
              : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
          }
        >
          {router.asPath === `/womanPage/product_list_order=discount` ? (
            <div className="flex">
              <p className="px-3 border-r border-white">Maximum discount</p>
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
  );
};

export default SortedFilters;
