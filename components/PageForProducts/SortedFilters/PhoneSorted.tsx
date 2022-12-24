import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "../../../hooks/redux";
import {
  sortByAscending,
  sortByDescending,
  sortByDiscount,
} from "../../../store/reducers/ProductSlice";
import { ProductPage } from "../../../types/product/productPage";

interface PhoneSortedProps {
  products: ProductPage[];
}

const PhoneSorted: FC<PhoneSortedProps> = ({ products }) => {
  const [sortByOpen, setSortByOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="w-full px-2" onClick={() => setSortByOpen(!sortByOpen)}>
      <p className="font-medium uppercase py-1.5 text-[#3f3e3e] cursor-pointer text-center border border-[#bebebe] bg-[#cccccc]">
        sort by:
      </p>
      <div
        className={
          sortByOpen
            ? "flex flex-wrap justify-between items-center border-b-2 border-black pb-5 mb-5"
            : "hidden"
        }
      >
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
            className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer text-center"
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
            className="p-1 mr-2 my-3 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer text-center"
            onClick={() => dispatch(sortByDescending(products))}
          >
            Price: Descending
          </a>
        </Link>
        <Link href={`${router.pathname}/product_list_order=discount`} replace>
          <a
            className="p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer text-center"
            onClick={() => dispatch(sortByDiscount(products))}
          >
            Maximum discount
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PhoneSorted;
