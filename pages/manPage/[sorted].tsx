import "rc-slider/assets/index.css";
import { FC } from "react";
import ManProductsSorted from "../../components/screens/manProducts/ManProductsSorted";
import Product from "../../models/Product";
import { ProductPage } from "../../types/product/productPage";
import db from "../../utils/db";

interface SortedScreenProps {
  products: ProductPage[];
}

const SortedScreen: FC<SortedScreenProps> = ({ products }) => {
  return <ManProductsSorted products={products} />;
};

export default SortedScreen;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({ productFor: "man" }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
