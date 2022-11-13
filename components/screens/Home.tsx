import { FC } from "react";
import { ProductPage } from "../../types/product/productPage";
import Minecraft from "../Collaboration/Minecraft/Minecraft";
import Hero from "../Hero/Hero";
import Products from "../Products/Products";

interface HomePageProps {
  products: ProductPage[];
}

const HomePage: FC<HomePageProps> = ({ products }) => {
  return (
    <>
      <Hero />
      <Products products={products} />
      <Minecraft />
    </>
  );
};

export default HomePage;
