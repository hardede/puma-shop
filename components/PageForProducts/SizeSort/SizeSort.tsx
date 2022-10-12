import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { sortBySize } from "../../../store/reducers/ProductSlice";
import { Product } from "../../../types/product";
import data from "../../../utils/data";

interface SizeSortProps {
  size: number;
}

const SizeSort: FC<SizeSortProps> = ({ size }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sneakers = data.sneakersMan;
  const myPath = router.pathname.split("/")[1];

  return (
    <div>
      <Link
        href={{
          pathname: `/${myPath}/[sorted]`,
          query: { sorted: `size-${size}` },
        }}
      >
        <a
          className={
            router.asPath === `/${myPath}/size-${size}`
              ? "flex max-h-[35px] p-2 text-sm  items-center border border-[#acacac] bg-[#ffd2d2] cursor-pointer m-0.5 font-bold border-b-4 border-b-red-500"
              : "flex max-h-[35px] p-2 text-sm font-light items-center border border-[#acacac] cursor-pointer m-0.5 hover:font-bold hover:border-b-4 hover:border-b-red-500"
          }
          onClick={() => dispatch(sortBySize({ sneakers, size }))}
        >
          <span>{size}</span>
        </a>
      </Link>
    </div>
  );
};

export default SizeSort;
