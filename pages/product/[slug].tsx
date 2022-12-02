import mongoose from "mongoose";
import { GetServerSideProps, NextPage } from "next";
import { FC } from "react";
import IndividualProductPage from "../../components/screens/IndivProductPage/IndividualProductPage";
import Product from "../../models/Product";
import { ProductPage } from "../../types/product/productPage";
import db from "../../utils/db";

interface ProductScreenProps {
  product: ProductPage;
}

const ProductScreen: FC<ProductScreenProps> = ({ product }) => {
  return <IndividualProductPage product={product} />;
};

export default ProductScreen;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const model = mongoose.models.Product;
    const product = await model.findOne({ slug }).lean();
    return {
      props: {
        product: product ? db.convertDocToObj(product) : null,
      },
    };
  } catch (e) {
    console.error(e);
  }
};
