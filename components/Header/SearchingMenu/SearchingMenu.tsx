import { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Product } from "../../../types/product";
import data from "../../../utils/data";
import SearchSneakersModal from "../../Modal/SearchSneakersModal";

interface SearchingMenuProps {
  searchMenuOpen: boolean;
  searchInput: string;
  setSearchMenuOpen: any;
}

const SearchingMenu: FC<SearchingMenuProps> = ({
  searchMenuOpen,
  searchInput,
  setSearchMenuOpen,
}) => {

  const nodeRef = useRef(null);

  return (
    <>
      <CSSTransition
        classNames="search-show"
        in={searchMenuOpen && searchInput !== ""}
        timeout={500}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          className="fixed w-full h-full top-0 left-0"
          onClick={() => setSearchMenuOpen(false)}
          ref={nodeRef}
        >
          <div
            className="w-[350px] top-20 right-32 absolute bg-white p-4 overflow-y-scroll"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-black">Goods</div>
            {data.sneakersMan
              .filter(item =>
                item.model.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((searchProduct: Product) => (
                <SearchSneakersModal
                  key={searchProduct.id}
                  searchProduct={searchProduct}
                />
              ))}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default SearchingMenu;
