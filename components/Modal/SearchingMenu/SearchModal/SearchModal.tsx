import { FC } from "react";
import SearchingMenu from "../SearchingMenu";

interface SearchModalProps {
  searchMenuOpen: boolean;
  setSearchMenuOpen: (value: boolean) => void;
  onClose: () => void;
}

const SearchModal: FC<SearchModalProps> = ({
  searchMenuOpen,
  setSearchMenuOpen,
  onClose,
}) => {
  return (
    <div onClick={onClose}>
      <div
        className="absolute w-screen h-[100px] top-20 right-0 bg-white py-[18px] px-6 z-50 text-black xs:px-3"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between h-full">
          <SearchingMenu
            searchMenuOpen={searchMenuOpen}
            setSearchMenuOpen={setSearchMenuOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
