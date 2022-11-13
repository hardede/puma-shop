import type { NextPage } from "next";
import ManProducts from "../components/screens/manProducts/ManProducts";
import Product from "../models/Product";
import { ProductPage } from "../types/product/productPage";
import db from "../utils/db";

interface ManPageProps {
  products: ProductPage[];
}

const ManPage: NextPage<ManPageProps> = ({ products }) => {
  return <ManProducts products={products} />;
};

export default ManPage;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
