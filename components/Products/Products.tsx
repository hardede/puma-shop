import { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from 'react-slick/lib/slider';
import data from "../../utils/data";
import ProductItem from "./ProductItem/ProductItem";

const Products: FC = () => {
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
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
        {data.sneakers.map((sneaker) => (
          <ProductItem key={sneaker.id} sneaker={sneaker} />
        ))}
      </Slider>
    </div>
  );
};

export default Products;
