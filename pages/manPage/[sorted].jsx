import "rc-slider/assets/index.css";
import ManProductsSorted from "../../components/screens/manProducts/ManProductsSorted";
import Product from "../../models/Product";
import db from "../../utils/db";

const SortedScreen  = ({ products }) => {
  return <ManProductsSorted products={products} />;
};

export default SortedScreen;

export const getServerSideProps = async () => {
  try {
    await db.connect();
    const products = await Product.find({ productFor: "man" }).lean();
    return {
      props: {
        products: products.map(db.convertDocToObj),
      },
    };
  } catch (e) {
    console.error(e);
  }
};