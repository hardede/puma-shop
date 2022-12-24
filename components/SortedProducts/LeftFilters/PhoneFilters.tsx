import { FC, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductPage } from "../../../types/product/productPage";
import { sizes } from "../../constants/sizes";
import MultiRangeSlider from "../../MultiRangeSlider/MultiRangeSlider";
import SizeSort from "../../PageForProducts/SizeSort/SizeSort";

interface PhoneFiltersProps {
  products: ProductPage[];
}

const PhoneFilters: FC<PhoneFiltersProps> = ({ products }) => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div
        className="w-full px-2 xs:mb-2"
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <p className="font-medium uppercase py-1.5 text-[#3f3e3e] cursor-pointer text-center border border-[#bebebe] bg-[#cccccc]">
          Filters:
        </p>
        <div
          className={filterOpen ? "" : "hidden"}
          onClick={e => e.stopPropagation()}
        >
          <div className="before:bg-[#dedede] my-2">
            <div
              className="flex justify-between items-center py-2"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <h3 className="uppercase font-bold text-[#2f2f2f]">
                product category
              </h3>
              {categoryOpen ? (
                <AiOutlineMinus className="mr-4  cursor-pointer" />
              ) : (
                <AiOutlinePlus className="mr-4 opacity-50 cursor-pointer" />
              )}
            </div>
            {categoryOpen && (
              <div>
                <p className="text-sm opacity-60 hover:text-red-600 transition-all ease-in-out duration-300 cursor-pointer hover:text-base">
                  Shoes
                </p>
                <p className="text-sm opacity-60  transition-all ease-in-out duration-300 cursor-pointer ">
                  Clothes
                </p>
                <p className="text-sm opacity-60 transition-all ease-in-out duration-300 cursor-pointer ">
                  Accessories
                </p>
              </div>
            )}
          </div>
          <div
            className={
              priceOpen
                ? "before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-12"
                : "before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-2"
            }
          >
            <div
              className="flex justify-between items-center py-4"
              onClick={() => setPriceOpen(!priceOpen)}
            >
              <h3 className="uppercase font-bold text-[#2f2f2f]">Price</h3>
              {priceOpen ? (
                <AiOutlineMinus className="mr-4 cursor-pointer" />
              ) : (
                <AiOutlinePlus className="mr-4 opacity-50 cursor-pointer" />
              )}
            </div>
            {priceOpen && (
              <div>
                <MultiRangeSlider
                  min={989}
                  max={29999}
                  sneakers={products}
                  onChange={({ min, max }: any) => `min = ${min}, max = ${max}`}
                />
              </div>
            )}
          </div>
          <div className="before:bg-[#dedede] before:w-full before:h-0.5 before:block mb-2">
            <div
              className="flex justify-between items-center py-4"
              onClick={() => setSizeOpen(!sizeOpen)}
            >
              <h3 className="uppercase font-bold text-[#2f2f2f]">Size</h3>
              {sizeOpen ? (
                <AiOutlineMinus className="mr-4 cursor-pointer" />
              ) : (
                <AiOutlinePlus className="mr-4 opacity-50 cursor-pointer" />
              )}
            </div>
            {sizeOpen && (
              <div className="flex flex-wrap">
                {sizes.map(item => (
                  <SizeSort
                    key={item.id}
                    size={item.size}
                    products={products}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneFilters;
