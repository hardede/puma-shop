import mongoose from "mongoose";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layout/Layout";
import HomePage from "../components/screens/Home";
import Product from "../models/Product";
import { ProductPage } from "../types/product/productPage";
import db from "../utils/db";

interface HomeProps {
  products: ProductPage[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <Layout title="Home Page">
      <HomePage products={products} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  await db.connect();
  const model = mongoose.models.Product
  const products = await model.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
