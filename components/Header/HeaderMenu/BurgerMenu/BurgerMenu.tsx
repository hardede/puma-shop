import Link from "next/link";
import { FC } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { headerLink } from "../../../constants/header";

interface BurgerMenuProps {
  onClose: () => void;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ onClose }) => {
  return (
    <div onClick={onClose}>
      <div
        className="absolute w-screen h-screen top-20 right-0 bg-white py-[30px] px-[40px] z-50 text-black"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between">
          <nav className="flex flex-col items-center">
            {headerLink.map(link => (
              <Link key={link.id} href={link.hre}>
                <a className="flex justify-between w-[500px] my-4 pb-2 items-center text-[#ae946d] text-xl cursor-pointer border-b-2 hover:border-b-[6px] hover:border-[#ae946d] transition-all ease-in-out duration-100 sm:w-[375px] xs:w-[250px]">
                  <p>{link.type}</p>
                  <MdKeyboardArrowRight className="w-8 h-8" />
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
