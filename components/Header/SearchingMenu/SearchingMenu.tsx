import { FC, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useDebounce from "../../../hooks/useDebounce";
import {
  fetchProducts,
  selectProducts
} from "../../../store/reducers/ProductSlice";
import { ProductPage } from "../../../types/product/productPage";
import SearchSneakersModal from "../../Modal/SearchSneakersModal";

interface SearchingMenuProps {
  searchMenuOpen: boolean;
  setSearchMenuOpen: (value: boolean) => void;
}

const SearchingMenu: FC<SearchingMenuProps> = ({
  searchMenuOpen,
  setSearchMenuOpen,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const debouncedSearch = useDebounce(searchInput);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch) dispatch(fetchProducts());
  }, [debouncedSearch, dispatch]);

  return (
    <>
      <div
        className="flex items-center border border-white border-opacity-20 py-2.5 px-6 mr-5 md:mr-0 xs:px-2"
        onClick={() => setSearchMenuOpen(!searchMenuOpen)}
      >
        <BiSearch className="text-2xl mr-3 md:text-3xl" />
        <input
          placeholder="find..."
          className="bg-transparent placeholder:uppercase outline-none md:border md:w-full md:px-4 md:py-2"
          onChange={changeInput}
          value={searchInput}
        />
      </div>
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
            className="w-[350px] max-h-[400px] top-20 right-32 absolute bg-white p-4 overflow-y-scroll md:w-screen md:top-44 md:right-0 md:max-h-[200px]"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-black">Goods</div>
            <div className="text-black">
              {searchInput && `Search by request: "${searchInput}"`}
            </div>
            {products
              .filter((item: ProductPage) =>
                item.model.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((searchProduct: ProductPage) => (
                <SearchSneakersModal
                  key={searchProduct._id}
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
