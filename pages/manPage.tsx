import mongoose from "mongoose";
import type { GetServerSideProps, NextPage } from "next";
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

export const getServerSideProps: GetServerSideProps = async () => {
    await db.connect();
    const model = mongoose.models.Product;
    const products = await model.find({ productFor: "man" }).lean();
    return {
      props: {
        products: products.map(db.convertDocToObj),
      },
    };
};

