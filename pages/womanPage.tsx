import mongoose from "mongoose";
import type { GetServerSideProps, NextPage } from "next";
import WomanProducts from "../components/screens/womanProducts/WomanProducts";
import Product from "../models/Product";
import { ProductPage } from "../types/product/productPage";
import db from "../utils/db";

interface WomanPageProps {
  products: ProductPage[];
};

const WomanPage: NextPage<WomanPageProps> = ({ products }) => {
  return <WomanProducts products={products} />;
};

export default WomanPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await db.connect();
    const model = mongoose.models.Product;
    const products = await model.find({ productFor: "woman" }).lean();
    return {
      props: {
        products: products.map(db.convertDocToObj),
      },
    };
  } catch (e) {
    console.error(e);
  }
};
