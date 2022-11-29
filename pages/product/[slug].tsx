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

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
