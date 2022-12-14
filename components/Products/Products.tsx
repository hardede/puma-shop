import { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from "react-slick";
import useRandomSneakers from "../../hooks/useRandomSneakers";
import { ProductPage } from "../../types/product/productPage";
import data from "../../utils/data";
import ProductItem from "./ProductItem/ProductItem";

interface ProductsProps {
  products: ProductPage[];
}

const Products: FC<ProductsProps> = ({ products }) => {
  const randomSneakers = useRandomSneakers({ products });

  if (!data.sneakers) {
    return null;
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "center",
    swipe: true,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

          // dots: true,
        },
      },
      {
        breakpoint: 949,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-20 flex justify-center">
      <Slider {...settings}>
        {randomSneakers.map((sneaker: ProductPage) => (
          <ProductItem key={sneaker._id} sneaker={sneaker} />
        ))}
      </Slider>
    </div>
  );
};

export default Products;
