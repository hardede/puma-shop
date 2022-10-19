import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { SiPuma } from "react-icons/si";
import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../hooks/redux";
import useTotalPrice from "../../hooks/useTotalPrice";
import { selectCartState } from "../../store/reducers/CartSlice";
import { headerLink } from "../constants/header";
import Drawer from "../Drawer/Drawer";
import MyInput from "../UI/MyInput";
import UserMenu from "../UserMenu/UserMenu";
import SearchingMenu from "./SearchingMenu/SearchingMenu";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const cartState = useAppSelector(selectCartState);
  const { totalQuantity } = useTotalPrice();
  const nodeRef = useRef(null);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <header className="absolute left-0 top-0 w-full z-10 px-10 bg-black text text-white">
      <div className="flex justify-between">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <a className="mr-[50px]">
              <SiPuma className="w-10 h-10 fill-white" />
            </a>
          </Link>
          <div className="flex justify-between">
            {headerLink.map(link => (
              <Link key={link.id} href={link.hre}>
                <a className="flex items-center px-[30px] h-[80px] font-medium cursor-pointer hover:border-b-[6px] hover:border-[#ae946d] transition-all ease-in-out duration-100">
                  {link.type}
                </a>
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center">
          <div>
            <div
              className="flex items-center border border-white border-opacity-20 py-2.5 px-6 mr-5"
              onClick={() => setSearchMenuOpen(!searchMenuOpen)}
            >
              <BiSearch className="text-2xl mr-3" />
              <MyInput
                placeholder="find..."
                className="bg-transparent placeholder:uppercase outline-none"
                onChange={changeInput}
                value={searchInput}
              />
            </div>
            <SearchingMenu
              searchMenuOpen={searchMenuOpen}
              setSearchMenuOpen={setSearchMenuOpen}
              searchInput={searchInput}
            />
          </div>
          <div
            className="px-4 relative"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            {cartState.length > 0 && (
              <span className="rounded-full bg-red-600 absolute text-xs px-2 font-extrabold py-1 right-0 bottom-3">
                {totalQuantity}
              </span>
            )}
            <AiOutlineShoppingCart className="fill-white text-2xl cursor-pointer" />
            <CSSTransition
              classNames="drawer"
              in={drawerOpen}
              timeout={500}
              unmountOnExit
              nodeRef={nodeRef}
            >
              <div
                className="fixed left-0 top-0 w-full h-full bg-[#00000088] z-50 "
                ref={nodeRef}
              >
                <Drawer onClose={() => setDrawerOpen(!drawerOpen)} />
              </div>
            </CSSTransition>
          </div>
          <div className="px-4" onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <BiUser className="fill-white text-2xl cursor-pointer" />
            <CSSTransition
              classNames="drawer"
              in={userMenuOpen}
              timeout={500}
              unmountOnExit
              nodeRef={nodeRef}
            >
              <div
                className="fixed left-0 top-0 w-full h-full bg-[#00000088] z-50 "
                ref={nodeRef}
              >
                <UserMenu onClose={() => setUserMenuOpen(!userMenuOpen)} />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
