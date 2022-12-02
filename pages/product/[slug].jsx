import IndividualProductPage from "../../components/screens/IndivProductPage/IndividualProductPage";
import Product from "../../models/Product";
import db from "../../utils/db";

const ProductScreen = ({ product }) => {
  return <IndividualProductPage product={product} />;
};

export default ProductScreen;

export const getServerSideProps= async (context) => {
  try {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    return {
      props: {
        product: product ? db.convertDocToObj(product) : null,
      },
    };
  } catch (e) {
    console.error(e);
  }
};
