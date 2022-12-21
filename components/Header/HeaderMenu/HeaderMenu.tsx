import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../../hooks/redux";
import useTotalPrice from "../../../hooks/useTotalPrice";
import useWindowSize from "../../../hooks/useWindowSize";
import { selectCartState } from "../../../store/reducers/CartSlice";
import Drawer from "../../Drawer/Drawer";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import SearchingMenu from "../SearchingMenu/SearchingMenu";
import UserMenu from "../UserMenu/UserMenu";
import SearchModal from "./SearchModal/SearchModal";

interface HeaderMenuProps {
  burgerMenuOpen: boolean;
  setBurgerMenuOpen: (value: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  searchMenuOpen: boolean;
  setSearchMenuOpen: (value: boolean) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (value: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (value: boolean) => void;
}

const HeaderMenu: FC<HeaderMenuProps> = ({
  burgerMenuOpen,
  setBurgerMenuOpen,
  drawerOpen,
  setDrawerOpen,
  searchMenuOpen,
  setSearchMenuOpen,
  userMenuOpen,
  setUserMenuOpen,
  searchModalOpen,
  setSearchModalOpen,
}) => {
  const [searchModal, setSearchModal] = useState(false);
  const nodeRef = useRef(null);
  const cartState = useAppSelector(selectCartState);
  const { totalQuantity } = useTotalPrice();
  const size = useWindowSize();

  useEffect(() => {
    setSearchModal(size.width <= 768);
  }, [size]);

  const burgerActive =
    "absolute top-5 block w-6 h-1 bg-white transition easy-in-out duration-500 after:absolute after:bottom-2 after:block after:w-6 after:h-1 after:bg-white before:absolute before:top-2 before:block before:w-6 before:h-1 before:bg-white";

  const burgerDisabled =
    "absolute top-5 block w-6 h-1 bg-transparent transition easy-in-out duration-500 after:absolute after:bottom-0 after:block after:w-6 after:h-1 after:bg-white after:rotate-45 before:absolute before:top-0 before:block before:w-6 before:h-1 before:bg-white before:-rotate-45";

  return (
    <div className="h-[80px] flex items-center">
      {searchModal ? (
        <div
          className="p-2"
          onClick={() => setSearchModalOpen(!searchModalOpen)}
        >
          <BiSearch className="text-3xl" />
          <CSSTransition
            classNames="drawer"
            in={searchModalOpen}
            timeout={500}
            unmountOnExit
            nodeRef={nodeRef}
          >
            <div
              className="fixed left-0 top-0 w-full h-full bg-[#00000088] z-50 "
              ref={nodeRef}
            >
              <SearchModal
                onClose={() => setSearchModalOpen(!searchModalOpen)}
                searchMenuOpen={searchMenuOpen}
                setSearchMenuOpen={setSearchMenuOpen}
              />
            </div>
          </CSSTransition>
        </div>
      ) : (
        <div>
          <SearchingMenu
            searchMenuOpen={searchMenuOpen}
            setSearchMenuOpen={setSearchMenuOpen}
          />
        </div>
      )}

      <div className="p-2 relative" onClick={() => setDrawerOpen(!drawerOpen)}>
        {cartState.length > 0 && (
          <span className="rounded-full bg-red-600 absolute text-xs px-2 font-extrabold py-1 right-0 bottom-3">
            {totalQuantity}
          </span>
        )}
        <AiOutlineShoppingCart className="fill-white text-3xl cursor-pointer" />
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
      <div className="p-2" onClick={() => setUserMenuOpen(!userMenuOpen)}>
        <BiUser className="fill-white text-3xl cursor-pointer" />
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
      <div
        className="p-2 flex items-center"
        onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
      >
        <div className="relative w-11 h-11 z-40">
          <span
            className={burgerMenuOpen ? burgerDisabled : burgerActive}
          ></span>
        </div>
        <h3>Links</h3>
        <CSSTransition
          classNames="drawer"
          in={burgerMenuOpen}
          timeout={500}
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div className="fixed left-0 top-0 w-full h-full z-50 " ref={nodeRef}>
            <BurgerMenu onClose={() => setBurgerMenuOpen(!burgerMenuOpen)} />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default HeaderMenu;
