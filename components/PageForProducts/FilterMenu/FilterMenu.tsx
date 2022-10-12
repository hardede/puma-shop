import Link from "next/link";
import { FC, useState } from "react";

interface FilterMenuProps {
  filter: any;
}

const FilterMenu: FC<FilterMenuProps> = ({ filter }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Link href={`/manPage?${filter.slug}`}>
      <a
        className={
          isActive
            ? "bg-black"
            : "p-1 mr-2 border border-[#ccc] hover:bg-black hover:text-white cursor-pointer"
        }
      >
        {filter.title}
      </a>
    </Link>
  );
};

export default FilterMenu;
