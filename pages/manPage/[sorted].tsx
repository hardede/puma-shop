import mongoose from "mongoose";
import { GetServerSideProps, NextPage } from "next";
import "rc-slider/assets/index.css";
import ManProductsSorted from "../../components/screens/manProducts/ManProductsSorted";
import Product from "../../models/Product";
import { ProductPage } from "../../types/product/productPage";
import db from "../../utils/db";

interface SortedScreenProps {
  products: ProductPage[];
}

const SortedScreen: NextPage<SortedScreenProps> = ({ products }) => {
  return <ManProductsSorted products={products} />;
};

export default SortedScreen;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await db.connect();
    const model = mongoose.models.Product;
    const products = await model.find({ productFor: "man" }).lean();
    return {
      props: {
        products: products.map(db.convertDocToObj),
      },
    };
  } catch (e) {
    console.error(e);
  }
};