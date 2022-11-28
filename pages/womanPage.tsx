import type { NextPage } from "next";
import WomanProducts from "../components/screens/womanProducts/WomanProducts";
import Product from "../models/Product";
import { ProductPage } from "../types/product/productPage";
import db from "../utils/db";

interface WomanPageProps {
  products: ProductPage[];
}

const WomanPage: NextPage<WomanPageProps> = ({ products }) => {
  return <WomanProducts products={products} />;
};

export default WomanPage;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({ productFor: "woman" }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
