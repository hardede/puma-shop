import "rc-slider/assets/index.css";
import { FC } from "react";
import WomanProductsSorted from "../../components/screens/womanProducts/WomanProductsSorted";
import Product from "../../models/Product";
import { ProductPage } from "../../types/product/productPage";
import db from "../../utils/db";

interface SortedScreenProps {
  products: ProductPage[];
}

const SortedScreen: FC<SortedScreenProps> = ({ products }) => {
  return <WomanProductsSorted products={products} />;
};

export default SortedScreen;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({ productFor: "woman" }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
