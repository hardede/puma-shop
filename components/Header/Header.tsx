import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { SiPuma } from "react-icons/si";
import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../hooks/redux";
import useScrollPosition from "../../hooks/useScrollPosition";
import useTotalPrice from "../../hooks/useTotalPrice";
import useWindowSize from "../../hooks/useWindowSize";
import { selectCartState } from "../../store/reducers/CartSlice";
import { headerLink } from "../constants/header";
import Drawer from "../Drawer/Drawer";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import UserMenu from "../Modal/UserMenu/UserMenu";
import SearchingMenu from "../Modal/SearchingMenu/SearchingMenu";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState<boolean>(false);
  const [headerMenu, setHeaderMenu] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const cartState = useAppSelector(selectCartState);
  const { totalQuantity } = useTotalPrice();
  const [headerSticky, setHeaderSticky] = useState(false);
  const scrollY = useScrollPosition();
  const size = useWindowSize();
  const nodeRef = useRef(null);

  useEffect(() => {
    setHeaderSticky(scrollY >= 600);
  }, [scrollY]);

  useEffect(() => {
    setHeaderMenu(size.width <= 959);
  }, [size]);

  return (
    <header
      className={
        headerSticky || burgerMenuOpen || searchModalOpen
          ? "sticky left-0 top-0 w-full z-10 px-10 bg-black text text-white transition duration-500 xs:px-4"
          : "absolute left-0 top-0 w-full z-10 px-10 bg-black text text-white transition duration-500 xs:px-4"
      }
    >
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="mr-[50px] xl:mr-[20px]">
            <SiPuma className="w-10 h-10 fill-white" />
          </a>
        </Link>
        {headerMenu ? (
          <>
            <HeaderMenu
              burgerMenuOpen={burgerMenuOpen}
              setBurgerMenuOpen={setBurgerMenuOpen}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              searchMenuOpen={searchMenuOpen}
              setSearchMenuOpen={setSearchMenuOpen}
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
              searchModalOpen={searchModalOpen}
              setSearchModalOpen={setSearchModalOpen}
            />
          </>
        ) : (
          <>
            <nav className="flex items-center">
              <div className="flex justify-between">
                {headerLink.map(link => (
                  <Link key={link.id} href={link.hre}>
                    <a className="flex items-center px-[30px] h-[80px] font-medium cursor-pointer hover:border-b-[6px] hover:border-[#ae946d] transition-all ease-in-out duration-100 xl:px-2.5">
                      {link.type}
                    </a>
                  </Link>
                ))}
              </div>
            </nav>
            <div className="flex items-center">
              <div>
                <SearchingMenu
                  searchMenuOpen={searchMenuOpen}
                  setSearchMenuOpen={setSearchMenuOpen}
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
              <div
                className="px-4"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
